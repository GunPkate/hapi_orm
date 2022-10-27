import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import moment from "moment";

@Entity({ name: "uservtwo" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  firstname!: string;
  @Column({ type: "varchar", length: 64 })
  lastname!: string;
  // @Column({
  //   type: "datetime",
  //   default: moment().format("YYYY/MM/D HH:mm"),
  // })
  @CreateDateColumn()
  datetime!: Date;
}
