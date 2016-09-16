# **subject designer**
h5专题设计器
***
## **技术栈**
webpack webpack-dev-server hmr gulp vue es6 commomJS less php/node
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
npm run start
```

### 4.浏览器访问

* 如果没报错，在浏览器下已经可以看到运行的项目，修改源码自动刷新
```bash
http://localhost:9090/dist/index.html
```

# **发布**

最终发行版本输出到dist目录下
进入项目根目录，命令窗口输入
```bash
npm run build
```


# **项目结构**

![](http://image18-c.poco.cn/mypoco/myphoto/20160916/03/18352577220160916030653031.png)

# **注意**

1. 目前文件上传使用`php`，代理端口为`82`，根据需要在webpack.config.js `devServer`修改

2. 开发环境端口为`9090`

3. hmr在配置及使用上有一定要求，如果乱修改配置有可能导致热替换功能失效

  暂时总结以下需要注意的地方

 - devServer inline：false *//如果为true有可能修改后页面整体刷新而不是热替换*

 - extractTextPlugin *//禁止使用这个插件，热替换会失效*

 - `if(module.hot) module.hot.accept(); `   *//js需要接受替换，否则会整页刷新，现在用了插件，所以不需要手动添加*

 - [chunkhash:8] *//不要添加hash后缀*

 - 样式没有更新 *//尝试用变量接收 var style = require('./style.less')*

 - 多个entry *//如果有多个入口，每个入口需要添加上 'webpack/hot/dev-server','webpack-dev-server/client?http://localhost:9090'*


# **让webstorm 支持\*.vue**

现在为止，ide对于vue单页面组件的支持并不好，虽然可以正确编译，但是ide会报一堆错，这对于代码洁癖来说难以忍受，
同时也不好对齐。通过简单的配置以及一些妥协，还是可以达到正常使用的程度的。

* 首先 `plugins` -> `browser repositories`->搜索**vue.js**并安装

* `file and code templates`->点击 `+` -> 输入 name:Vue,extension:vue，并配置模板如下(根据实际需求配咯)

    ```html
    <template>
    
    </template>
    <style lang="less" scoped>
    
    </style>
    <script type="es6">
    
    </script> 
    ```

* `file types` -> 在上面找到**html**->点击下面的 `+` ->输入`*.vue`

* `language injections`->`+`->`xml tag injection`

    ![](http://image18-c.poco.cn/mypoco/myphoto/20160916/03/18352577220160916030710023.png)



* `language & frameworks`->`javascript`->javascript language version 选择 **ECMAScript 6**

#####***ps:注意这时候使用less等语法还是会报错或者没有提示，所以推荐在同目录下新建一个less文件，并在vue的 style标签里面 @import***