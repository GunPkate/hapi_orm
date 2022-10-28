import { UserLog } from "../Entities/UserLogModel";
import { DataSource } from "typeorm";
import { User } from "../Entities/UserModels";

const local_dataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "login",
  synchronize: true,
  logging: true,
  entities: [UserLog,User],
});
console.log("connected");
local_dataSource.initialize();

export default local_dataSource;
