# 文件上传

## 接口调试

可使用一个vscode插件 **Rest Client** 进行发送请求测试（类似postman）。

新建文件 `test.http`

```yaml
POST /upload/single HTTP/1.1
Host: test.com:9527
# 上传文件的 Content-Type一般是 multipart/form-data，当然也可以是其他的。
# boundary 为分隔符，具体的看下面 ---aaa ... ---aaa--部分
Content-Type: multipart/form-data; boundary=aaa

# ---aaa 为开始标志
---aaa
# name=“avatar” 这个是根据接口文档决定写什么
# filename 是本地图片的文件名，可以给服务器作参考
Content-Disposition: form-data;name="avatar";filename="small.jpg"
Content-Type: image/jpeg

# 这里写图片的二进制数据
# 可以使用本插件提供的功能，直接写个本地图片的路径，插件会自动读取文件的二进制数据
< .small.jpg
---aaa--
# ---aaa-- 为结束标志
```
