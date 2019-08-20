export default class UserController {
  static async signIn(ctx) {
    ctx.body = await new Promise(resolve => resolve("hello world"));
  }
}
