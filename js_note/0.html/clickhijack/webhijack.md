## web网站点击劫持 这种行为又被称为界面伪装（UI redressing）
Q: 
移动端兑换商城放在beta.webapp.skysrt.com上，用向宏波和yuqi
的手机打开时，首页会被劫持，注入广告代码（图片形式）
http://beta.webapp.skysrt.com/yuanbo/test/webhijack/start.html

### 参考资料
1. 上网页面被强制广告——简单分析[https://blog.csdn.net/wangqiuyun/article/details/45424307]
2. 网站被强制注入JS，嵌入iframe弹窗广告[https://blog.csdn.net/weixin_33720452/article/details/91431546]
#### 问题原因
可能原因:
1. 

#### 表现形式/注入方法
1. 一般用iframe形式注入


#### 解决方法
1. 使用https ssl证书加密
2. 网站禁用iframe
    HTTP响应头： The X-Frame-Options HTTP 响应头是用来给浏览器 指示允许一个页面 可否在 <frame>, <iframe>, <embed> 或者 <object> 中展现的标记。站点可以通过确保网站没有被嵌入到别人的站点里面，从而避免 clickjacking 攻击。

    meta禁用iframe 
    <meta http-equiv="X-Frame-Options" content="DENY">
    但是MDN说明:
    "Note: 设置 meta 标签是无效的！例如 <meta http-equiv="X-Frame-Options" content="deny"> 没有任何效果。不要这样用！只有当像下面示例那样设置 HTTP 头 X-Frame-Options 才会生效。"
    X-Frame-Options(MDN):[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options]
    （meta标签设置无效，必须在服务器端设置HTTP响应头):
    X-Frame-Options: deny
    X-Frame-Options: sameorigin
    X-Frame-Options: allow-from https://example.com
3. js禁用iframe
<script>
    if (top.location != self.location) {
        top.location = self.location
    }
</script>
4. css让iframe显示为空白
<style>
    iframe {
        v: expression(this.src="about:black", this.outerHTML="");
    }
</style>

#### 延伸思考
0. qq怎么防止网页劫持？
1. qq怎么判断加载的js不是自己的？
2. qq怎么禁止‘运营商注入的js’执行？
