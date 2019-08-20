import { createConnection } from "typeorm";
import "reflect-metadata";

export default async function doConnection() {
  try {
    // createConnection方法会自动读取来自ormconfig文件或环境变量中的连接选项
    const connection = await createConnection();
    console.log(
      "db connect successfully. is Connected: " + connection.isConnected
    );
  } catch (err) {
    console.log("db connect failed. error is: " + err);
  }
}
