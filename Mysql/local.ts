import { User } from "../Entities/UserModel";
import { DataSource } from "typeorm";

const local_dataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3406,
  username: "root",
  password: "",
  database: "intern_dev",
  "synchronize": true,
  logging: true,
  entities: [User],
});
console.log("connected");
local_dataSource.initialize();

export default local_dataSource;
