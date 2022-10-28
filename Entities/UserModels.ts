import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  firstname!: string;
  @Column({ type: "varchar", length: 64 })
  lastname!: string;

  @Column({ type: "varchar", length: 64 })
  password!: string;
}
