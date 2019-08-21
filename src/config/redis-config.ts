import { Redis } from "ioredis";
export const redis = {
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  prefix: "koa:", //存诸前缀
  ttl: 60 * 60 * 23, //过期时间
  family: 4,
  db: 0
};
export const newRedis = new Redis(redis);
