import { UserDao } from "../dao/user-dao";
import { User } from "../entity/user";
import { redis } from "../config/redis-config";
export default class UserController {
  static async signIn(ctx) {
    //redis.set("sessionId", account);
  }

  // 注册用户
  static async register(ctx) {
    let req = ctx.request.body;
    console.log(req);
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
      ctx.response.status = 404;
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
      ctx.response.status = 404;
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
      ctx.response.status = 404;
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
      ctx.response.status = 404;
      ctx.body = {
        code: 20002,
        msg: "user id error"
      };
    }
  }
  // 获取所有用户
  static async getAllUsers(ctx) {
    try {
      let users = await UserDao.getAllUser();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: "success",
        data: users
      };
    } catch (err) {
      ctx.response.status = 404;
      ctx.body = {
        code: 20007,
        msg: "get users error",
        data: err
      };
    }
  }
}
