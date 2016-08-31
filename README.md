[TOC]
# **单页面h5编辑器**
## **技术栈**
**webpack webpack-dev-server gulp vue es6 commomJS less php/node**
***
### 1.clone或者下载项目
```bash
git clone https://github.com/singleparty/h5-demo.git
```
### 2.安装依赖模块
进入项目根目录，`shift`+右键->点击**在此处打开命令窗口**，输入以下命令

* 更换淘宝的镜像
```bash
npm config set registry=https://registry.npm.taobao.org
```
* 安装项目依赖
```bash
npm install
```
* 以下模块全局安装
```bash
npm install gulp webpack webpack-dev-server -g
```
### 3.启动webpack-dev-server

* 在项目根目录下，命令窗口输入以下命令
```bash
npm run webpack-dev-server
```
### 4.浏览器访问

* 如果没报错，在浏览器下已经可以看到运行的项目，修改源码自动刷新
```bash
http://localhost:9090/dist/index.html
```

# **发布**

最终打包的文件输出到dist目录下
进入项目根目录，命令窗口运行gulp命令
```bash
gulp build
```
# **项目结构**

![](http://00an.com/image/demo/6.png)