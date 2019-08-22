import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import AppRoutes from "./routes";
import { doConnection } from "./config/db-config";
import { URLFilter } from "./util/url-filter";
import onerror = require("koa-onerror");
//import logger = require("koa-logger");

//const Store = new Redis().client

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

// 简单请求打印
app.use(async (ctx, next) => {
  console.log(" [", ctx.request.method, "] ", ctx.url, " status: ", ctx.status);
  await next();
});
// 数据库连接
doConnection();

// error handler
onerror(app);

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

//路由
console.log("route: ", typeof AppRoutes);
AppRoutes.forEach(route => router[route.method](route.path, route.action));

//app.use(URLFilter("^/api"));

// middlewares ⚠️中间件是有注册顺序，先bodyParser，后router.routes()，最后监听端口
//app.use(bodyParser());
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"]
  })
);
router.prefix("/api/v1");
app.use(router.routes());
app.use(router.allowedMethods()); //只允许特定请求方法

app.listen(port);
console.log(`应用启动成功 端口:${port}`);
