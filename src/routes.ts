import UserController from "./controller/user-controller";

export default [
  {
    path: "/",
    method: "get",
    action: UserController.signIn
  }
];
