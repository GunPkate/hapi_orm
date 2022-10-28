import { User } from "../Entities/UserModel";
import { DataSource } from "typeorm";

const local_dataSource: DataSource = new DataSource({
  type: "mysql",
  host: "mysql.thaistopbully.org",
  port: 33060,
  username: "intern",
  password: "intern@2022",
  database: "intern_test",
  synchronize: true,
  // logging: true,
  entities: [User],
});
console.log("connected");
local_dataSource.initialize();

export default local_dataSource;
