HTTP X-XSS-PROTECTION 响应头
[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-XSS-Protection]

X-XSS-PROTECTION: 0
X-XSS-PROTECTION: 1
X-XSS-PROTECTION: 1; mode=block
X-XSS-PROTECTION: 1; report=<reporting-uri>

0 禁止xss过滤
1 启用xss过滤


## 2. Content-Security-Policy
HTTP 响应头Content-Security-Policy允许站点管理者控制用户代理能够为指定的页面加载哪些资源。除了少数例外情况，设置的政策主要涉及指定服务器的源和脚本结束点。这将帮助防止跨站脚本攻击（Cross-Site Script）（XSS）。

