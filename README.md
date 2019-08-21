# demo-koa-ts-typeorm

一个小的koa demo，基于koa框架，typescript写的，orm用的typeOrm

搭建环境

1.先安装 node、npm

```
node -v
npm -v
```

npm 集成到 node 中了，只要成功的安装了 node，npm 也会被成功安装。

2.安装 koa
我们学习和应用的是 koa 项目，就先安装上 koa 吧。

```
npm init   # and follow the resulting prompts to set up the project
npm install koa --save
```

3.安装 koa 脚手架 koa-generator

```
npm install koa-generator --save -g
npm i koa koa-router
npm i --save-dev typescript ts-node nodemon
npm i --save-dev @types/koa @types/koa-router
```

4.生成 koa2 项目

```
koa2 hello-koa #在当前目录下生成一个新的名为“hello-koa”的koa项目
koa2 #在当前目录下生成项目
```

用 koa 脚手架生成的目录结构

```
durian/（项目名称）
         |----  bin
                     |---- www （启动文件）
         |----  node_modules
                     |---- 安装的各种依赖
         |----  public
                     |---- image
                     |---- style
                     |---- javascript
         |----  router
                     |---- index.js （路由）
                     |---- users.js
         |----  view
                     |---- layout.jade（.jade 源于 Node.js 的 HTML 模板引擎，类似于.ejs模板 )
                     |---- index.jade
                     |---- error.jade
         |----  app.js
         |----  package.json
```

5.切换当前目录，安装依赖包

```
npm install
```

npm 安装其他依赖
安装 mysql

```
npm install mysql --save -g # --save: -g 全局安装
npm install typeorm --save  # TypeORM
npm install reflect-metadata --save  # 依赖模块
npm i redis --save
npm install ioredis --save
```

TypeScript 配置
确保你的 TypeScript 编译器的版本大于 2.3，并且在 tsconfig.json 开启下面设置:

```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

同时需要开启编译选项里的 lib 下的 es6 或者从@typings 安装 es6-shim

6.启动服务

```
npm start
```

6.打开浏览器：[http://localhost:3000/](http://localhost:3000/)
