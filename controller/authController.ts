import { DataSource } from "typeorm";
import local_dataSource from "../Mysql/local";
import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { User } from "../Entities/UserModels";

export const authController = (): Array<ServerRoute> => {
  const userRepo = local_dataSource.getRepository(User);
  return [
    {
      method: "POST",
      path: "/auth/finduser",
      options: {
        auth: {strategy: "simple"},
      },
      handler: async (request: Request, h: ResponseToolkit) => {
        return await userRepo.find();
        return "12345";
      },
    },
  ];
};
