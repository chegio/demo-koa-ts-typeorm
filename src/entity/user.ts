import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userNo: string;
  @Column()
  userName: string;
  @Column()
  passwdSh1: string;
  @Column()
  mobile: string;
  @Column("datetime")
  createdAt: Date;
  @Column("datetime")
  updatedAt: Date;
}
