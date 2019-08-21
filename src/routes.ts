import UserController from "./controller/user-controller";

export default [
  {
    // 登录
    path: "/user/signIn",
    method: "get",
    action: UserController.signIn
  },
  {
    // 注册
    path: "/users/register",
    method: "post",
    action: UserController.register
  },
  {
    // 获取用户列表
    path: "/users",
    method: "get",
    action: UserController.getAllUsers
  },
  {
    // 获取用户信息
    path: "/users/:id",
    method: "get",
    action: UserController.getUser
  },
  {
    // 修改用户
    path: "/users/:id",
    method: "put",
    action: UserController.putUser
  },
  {
    // 删除用户
    path: "/users/:id",
    method: "delete",
    action: UserController.delUser
  }
];
