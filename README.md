# 单页面h5编辑器
还处于残缺阶段可能会也可能不会继续开发
***
## 1.clone
```bash
git clone https://github.com/singleparty/h5-demo.git
```
## 2.进入项目根目录，安装依赖模块
```bash
npm config set registry=https://registry.npm.taobao.org
npm install
npm install gulp webpack webpack-dev-server -g
```
## 3.启动webpack-dev-server
```bash
npm run webpack-dev-server
```
## 4.浏览器访问地址
```bash
http://localhost:9090/dist/index.html
```

# 发布打包
最终打包的文件放在dist目录下，运行gulp命令
```bash
gulp build
```