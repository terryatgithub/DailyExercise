<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Upload />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Upload from '@/components/Upload.vue'; // @ is an alias to /src

@Component({
  components: {
    Upload,
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
