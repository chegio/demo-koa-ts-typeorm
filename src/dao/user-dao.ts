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
  getAllUser: async () => {
    const userRepo = getRepository(User);
    return await userRepo.find({ deleteFlag: 0 });
  }
};
