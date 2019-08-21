import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  //@Column({ name: "user_no" })
  //userNo: string;
  @Column({ name: "user_name" })
  userName: string;
  @Column({ name: "passwd_sha1" })
  passwdSha1: string;
  @Column({ name: "mobile" })
  mobile: string;
  @Column({ name: "delete_flag" })
  deleteFlag: number;
  @Column({ name: "created_at" })
  createdAt: Date;
  @Column({ name: "updated_at" })
  updatedAt: Date;
}
