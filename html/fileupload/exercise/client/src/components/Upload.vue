<template>
  <div>
    <label for="chooseFileId">选择上传文件: </label>
    <br />
    <input id="chooseFileId" type="file" @change="handleFileChange" />
    <br />
    <el-button @click="handleUpload">上传</el-button>
    <el-button @click="handlePause" v-if="!isPaused">暂停上传</el-button>
    <el-button @click="handleResume" v-else>继续上传</el-button>
    <el-button @click="handleRemove">删除已上传文件</el-button>
    <div>
      <h5>计算文件hash进度条</h5>
      <el-progress :percentage="hashPercentage"></el-progress>
      <h5>上传进度条</h5>
      总进度
      <el-progress :percentage="fakeUploadPercentage"></el-progress>
      <el-table :data="data">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="hash" label="文件名"></el-table-column>
        <el-table-column prop="size" label="文件大小"></el-table-column>
        <el-table-column prop="percentage" label="进度">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percentage"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
const SIZE = 10 * 1024 * 1024; // 切片大小

export default {
  name: "Upload",
  data() {
    return {
      container: {
        // 包含选择文件的信息
        file: null,
      },
      data: [], //包含切片信息
      requestList: [], // 上传xhr list，用于暂停上传
      hashPercentage: 0, // 计算文件hash的进度
      isPaused: false, //暂停上传状态
      fakeUploadPercentage: 0, // 文件上传进度（fake 只增加不减少）
    };
  },
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.data.length) {
        return 0;
      }
      const loaded = this.data
        .map((item) => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur);

      return parseInt((loaded / this.container.file.size).toFixed(2));
    },
  },
  watch: {
    uploadPercentage(now) {
        if(now > this.fakeUploadPercentage) {
            this.fakeUploadPercentage = now
        }
    },
  },
  methods: {
    async handleRemove() {
      if (!this.container.file) return;
      let { data } = await request({
        url: "http://localhost:3000/remove",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          filename: this.container.file.name,
        }),
      });
      data = JSON.parse(data);
      this.$message.success(data.message);
    },
    handlePause() {
      this.$message.success("暂停上传");
      this.isPaused = true;
      this.requestList.forEach((xhr) => xhr?.abort());
      this.requestList = [];
    },
    async handleResume() {
      this.$message.success("继续上传");
      this.isPaused = false;
      const { uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );
      await this.uploadChunks(uploadedList);
    },
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) {
        return;
      }
      console.log(this.$data);
      // Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    // 生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + size),
        });
        cur += size;
      }
      return fileChunkList;
    },
    // 上传切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .filter(({ hash }) => !uploadedList.includes(hash))
        .map(({ chunk, hash, index }) => {
          // 以 FormData 格式上传数据
          const formdata = new FormData();
          formdata.append("chunk", chunk);
          formdata.append("hash", hash);
          formdata.append("filename", this.container.file.name);
          return { formdata, index };
        })
        .map(
          async ({ formdata, index }) =>
            await request({
              url: "http://localhost:3000",
              data: formdata,
              onProgress: this.createProgressHandler(index),
              requestList: this.requestList,
            })
        );

      // 并发发送切片
      await Promise.all(requestList);
      // 之前上传的切片数量+ 本次上传的切片数量 = 所有切片数量时
      // 发送’合并切片‘请求
      if (uploadedList.length + requestList.length === this.data.length) {
        await this.mergeRequest();
      }
    },
    // 发送合并切片请求
    async mergeRequest() {
      await request({
        url: "http://localhost:3000/merge",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          filename: this.container.file.name,
          size: SIZE, //切片大小
        }),
      });
    },
    // 生成文件hash(web-worker)
    calculateHash(fileChunkList) {
      return new Promise((resolve) => {
        // 添加worker属性
        this.container.worker = new Worker("/hash.js");
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = (e) => {
          const { percentage, hash } = e.data;
          this.hashPercentage = percentage;
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    // 上传前查询服务器是否已有相关文件
    async verifyUpload(filename, fileHash) {
      const { data } = await request({
        url: "http://localhost:3000/verify",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          filename,
          fileHash,
        }),
      });
      return JSON.parse(data);
    },
    // 点击上传
    async handleUpload() {
      if (!this.container.file) {
        return;
      }
      const fileChunkList = this.createFileChunk(this.container.file);
      this.container.hash = await this.calculateHash(fileChunkList);

      // 秒传逻辑
      const { shouldUpload, uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );
      if (!shouldUpload) {
        this.$message.success("秒传: 上传成功");
        return;
      }

      this.data = fileChunkList.map(({ file }, index) => ({
        fileHash: this.container.hash,
        chunk: file,
        index,
        // hash: this.container.file.name + "_" + index, // hash用文件名+数组下标
        hash: this.container.hash + "_" + index, // hash用文件名+数组下标
        percentage: uploadedList.includes(this.container.hash + "_" + index)
          ? 100
          : 0,
        size: SIZE,
      }));
      await this.uploadChunks(uploadedList);
    },
    createProgressHandler(index) {
      return (e) => {
        console.log(`${index}: ${e}`);
        // todo why String ?
        this.data[index].percentage = parseInt(
          String((e.loaded / e.total) * 100)
        );
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
