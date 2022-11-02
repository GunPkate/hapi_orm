import { UserLog } from "../Entities/UserLogModel";
import { DataSource } from "typeorm";
import { User } from "../Entities/UserModels";

const intern_dataSource: DataSource = new DataSource({
  type: "mysql",
  host: "mysql.thaistopbully.org",
  port: 33060,
  username: "intern",
  password: "intern@2022",
  database: "intern_test",
  synchronize: true,
  // logging: true,
  entities: [UserLog, User],
});
console.log("connected");
intern_dataSource.initialize();

export default intern_dataSource;
