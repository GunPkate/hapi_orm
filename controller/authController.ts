import { DataSource } from "typeorm";
import local_dataSource from "../Mysql/local";
import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { User } from "../Entities/UserModels";
import Jwt from "jsonwebtoken";
import { userSchema } from "../Joi/UserSchema";
import Boom from "@hapi/boom";
import bcrypt from "bcrypt";

export const authController = (connect: DataSource): Array<ServerRoute> => {
  const userRepo = local_dataSource.getRepository(User);
  return [
    {
      method: "POST",
      path: "/auth/login",
      handler: async (request: Request, h: ResponseToolkit) => {
        const user: any = request.payload;
        const exist: User | any = await User.find({
          select: { firstname: user.firstname, password: true },
        });
        let token = "";
        if (exist !== null) {
          token = Jwt.sign(user, "secret", { expiresIn: "1h" });
          console.log(token);
        }
        return h.response(token);
      },
    },
    {
      method: "GET",
      path: "/auth/loginpage",
      handler: async (request: Request, h: ResponseToolkit) => {
        return await h.file("./index_ts_auth.html");
      },
    },
    {
      method: "Get",
      path: "/auth/jwt/finduser",
      options: {
        auth: { strategy: "jwt" },
      },
      handler: async (request: Request, h: ResponseToolkit) => {
        // return await userRepo.find();
        return await User.find();
        return "12345";
      },
    },
    {
      method: "POST",
      path: "/auth/register",
      options: {
        auth: { strategy: "jwt" },
      },
      handler: async (request: Request, h: ResponseToolkit) => {
        const user: any = request.payload;
        const { error, value } = userSchema.validate(user);
        if (error) {
          return Boom.boomify(error, { statusCode: 400 });
        }
        const hash = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(user.password, hash);

        const register = await User.insert({
          firstname: user.firstname,
          lastname: user.lastname,
          password: pass,
        });
        return await h.response(register);
      },
    },
  ];
};
