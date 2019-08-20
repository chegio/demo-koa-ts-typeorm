import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import AppRoutes from "./routes";
import errorHandler from "./catcher";
import dbConnection from "./db/config";

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

app.use(async (ctx, next) => {
  console.log("url: ", ctx.url);
  await next();
});
// 数据库连接
dbConnection();
//app.use(router.routes());
//app.listen(8080);

//const json = require("koa-json");
//const onerror = require('koa-onerror')
//const bodyparser = require("koa-bodyparser");
//const logger = require('koa-logger')

//const index = require("./routes/index");
//const users = require("./routes/users");

// error handler
//onerror(app)

//app.use(json());
//app.use(logger())

// logger
/* app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}) */

// routes
//app.use(index.routes(), index.allowedMethods());
//app.use(users.routes(), users.allowedMethods());

// error-handling
/* app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
}); */

class test {
  constructor(parameters?: string) {
    console.log(parameters);
  }

  @errorHandler.catcher()
  hello() {
    console.log("hello world !!!");
    throw "haha";
  }
}

let t = new test("class inited ...");
t.hello();
console.log(new Date());

//路由
console.log("shihui: ", typeof AppRoutes);
AppRoutes.forEach(route => router[route.method](route.path, route.action));

// middlewares
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"]
  })
);
//app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);
console.log(`应用启动成功 端口:${port}`);
