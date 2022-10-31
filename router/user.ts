import Boom from "@hapi/boom";
("use strict");

import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";
import { User } from "../Entities/UserModels";
import { userSchema } from "../Joi/UserSchema";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const plugin = {
  name: "user",
  version: "1.0.0",
  register: async (server: Server) => {
    server.route({
      method: "POST",
      path: "/user/register",
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
    });

    // server.route({
    //   method: "POST",
    //   path: "/user/login",
    //   handler: async (request: Request, h: ResponseToolkit) => {
    //     const user: any = request.payload;
    //     const exist: User | any = await User.find({
    //       select: { firstname: user.firstname, password: true },
    //     });
    //     let token = "";
    //     if (exist !== null) {
    //       // const checkpass = await bcrypt.compare(
    //       //   exist[0].password,
    //       //   user.password
    //       // );
    //       token = Jwt.sign(user, "secret", { expiresIn: "1h" });
    //       // console.log(checkpass);
    //       console.log(user.password, 1);
    //       console.log(exist[0].password, 2);
    //       // console.log(checkpass, 3);
    //       console.log(token);
    //     }
    //     return h.response(token);
    //   },
    // });

    server.route({
      method: "GET",
      path: "/user/login",
      handler: async (request: Request, h: ResponseToolkit) => {
        console.log(request.payload);
        return h.response("yes");
      },
    });

    server.route({
      method: "GET",
      path: "/user/findall",
      handler: async (request: Request, h: ResponseToolkit) => {
        const findall = await User.find();
        return h.response(findall);
        // return h.response("findall");
      },
    });
  },
};

export default plugin;
