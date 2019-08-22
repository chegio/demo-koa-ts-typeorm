import { UserDao } from "../dao/user-dao";
import { User } from "../entity/user";
import { redis } from "../config/redis-config";
export default class UserController {
  static async signIn(ctx) {
    //redis.set("sessionId", account);
    let req = ctx.request.body;
    if (req.username && req.passwd) {
      try {
        let user = await UserDao.getUserByOpt({ username: req.username });
        console.log(
          "user.passwdsha1:",
          user.passwdSha1,
          " req.passwd: ",
          req.passwd
        );
        if (user.passwdSha1 == req.passwd) {
          ctx.body = {
            code: 200,
            msg: "sign in ok"
          };
        } else {
          ctx.response.status = 422;
          ctx.body = {
            code: 20001,
            msg: "password error"
          };
        }
        ctx.response.status = 200;
      } catch (err) {
        ctx.response.status = 404;
        ctx.body = {
          code: 20009,
          msg: "sign error",
          data: err
        };
      }
    }
  }

  // 注册用户
  static async register(ctx) {
    let req = ctx.request.body;
    if (req.username && req.password && req.mobile) {
      try {
        let user = new User();
        //user.userNo = "1234235";
        user.userName = req.username;
        user.passwdSha1 = req.password;
        user.mobile = req.mobile;
        let data = await UserDao.addUser(user);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "success",
          data: data.id
        };
      } catch (err) {
        ctx.response.status = 404;
        ctx.body = {
          code: 20001,
          msg: "register error",
          data: err
        };
      }
    } else {
      ctx.response.status = 422;
      ctx.body = {
        code: 20004,
        msg: "params error"
      };
    }
  }
  // 获取用户
  static async getUser(ctx) {
    if (ctx.params.id) {
      try {
        let user = await UserDao.getUser(ctx.params.id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "success",
          data: user
        };
      } catch (err) {
        ctx.response.status = 404;
        ctx.body = {
          code: 20001,
          msg: "get user error",
          data: err
        };
      }
    } else {
      ctx.response.status = 422;
      ctx.body = {
        code: 20002,
        msg: "user id error"
      };
    }
  }
  // 修改用户
  static async putUser(ctx) {
    let req = ctx.request.body;
    if (ctx.params.id) {
      try {
        let user = new User();
        //user.userNo = ctx.params.id;
        user.userName = req.username;
        user.passwdSha1 = req.password;
        user.mobile = req.mobile;
        let data = await UserDao.updUser(ctx.params.id, user);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "success",
          data: data
        };
      } catch (err) {
        ctx.response.status = 404;
        ctx.body = {
          code: 20006,
          msg: "update user`s infomation error",
          data: err
        };
      }
    } else {
      ctx.response.status = 422;
      ctx.body = {
        code: 20004,
        msg: "params error"
      };
    }
  }
  // 删除用户
  static async delUser(ctx) {
    if (ctx.params.id) {
      try {
        let user = await UserDao.delUser(ctx.params.id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "success",
          data: user
        };
      } catch (err) {
        ctx.response.status = 404;
        ctx.body = {
          code: 20003,
          msg: "delete user error",
          data: err
        };
      }
    } else {
      ctx.response.status = 422;
      ctx.body = {
        code: 20002,
        msg: "user id error"
      };
    }
  }
  // 获取用户列表
  static async getAllUsers(ctx) {
    let users: User[];
    try {
      if (ctx.request.query.page && ctx.request.query.perpage) {
        let offset = (ctx.request.query.page - 1) * ctx.request.query.perpage;

        users = await UserDao.getUsersPaged(offset, ctx.request.query.perpage);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            page: ctx.request.query.page,
            perPage: ctx.request.query.perpage,
            users: users
          }
        };
      } else {
        users = await UserDao.getAllUsers();
        ctx.body = {
          code: 200,
          msg: "success",
          data: users
        };
      }
      ctx.response.status = 200;
    } catch (err) {
      ctx.response.status = 404;
      ctx.body = {
        code: 20007,
        msg: "get user list error",
        data: err
      };
    }
  }
}
