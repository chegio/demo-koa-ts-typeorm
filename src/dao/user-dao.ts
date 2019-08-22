import { getRepository } from "typeorm";
import { User } from "../entity/user";

export const UserDao = {
  addUser: async (user: User) => {
    const userRepo = getRepository(User);
    return await userRepo.save(user);
  },
  getUser: async (userNum: number) => {
    const userRepo = getRepository(User);
    return await userRepo.findOne({ id: userNum });
  },
  getUserByOpt: async (opts: { [key: string]: any }) => {
    const userRepo = getRepository(User);
    return await userRepo.findOne(opts);
  },
  updUser: async (userNum, user: User) => {
    const userRepo = getRepository(User);
    return await userRepo.update(
      { id: userNum },
      {
        userName: user.userName,
        passwdSha1: user.passwdSha1,
        mobile: user.mobile
      }
    );
  },
  delUser: async (userNum: number) => {
    const userRepo = getRepository(User);
    let userToRemove = await userRepo.findOne({ id: userNum });
    //return await userRepo.remove(userToRemove);
    return await userRepo.update(
      { id: userNum },
      {
        deleteFlag: 1
      }
    );
  },
  getUsersPaged: async (offset, perPage: number) => {
    const userRepo = getRepository(User);
    return await userRepo
      .createQueryBuilder("user")
      .where("user.delete_flag = :deleteFlag", { deleteFlag: 0 })
      .orderBy("user.id", "ASC")
      .offset(offset)
      .limit(perPage)
      .getMany();
    //xreturn await userRepo.createQueryBuilder("user").where("user.delete_flag = :deleteFlag",{deleteFlag:0}).skip(5).limit(3);
  },
  getAllUsers: async () => {
    const userRepo = getRepository(User);
    return await userRepo.find({ deleteFlag: 0 });
  }
};
