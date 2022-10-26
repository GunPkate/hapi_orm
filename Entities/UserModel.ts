import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "uservtwo" })
export class User  {
  @PrimaryColumn({ type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  firstname!: string;
  @Column({ type: "varchar", length: 64 })
  lastname!: string;
  @Column({ type: "datetime", default: null })
  datetime!: Date;
}
