import Boom from "@hapi/boom";
("use strict");

import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";
import { User } from "../Entities/UserModels";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// let validate = false;
const plugin = {
  name: "login",
  version: "1.0.0",
  congfig: {},
  register: async (server: Server) => {
    server.route({
      method: "POST",
      path: "/login",
      handler: async (request: Request, h: ResponseToolkit) => {
        const user: any = request.payload;
        const exist = await User.find({
          select: { firstname: user.firstname, password: true },
        });
        let token = "";
        if (exist !== null) {
          // const checkpass = exist.password;
          // bcrypt.compare(user.password, exist.password);
          token = Jwt.sign(user.firstname, "secret");
          // validate = true;
        }
        console.log(user.firstname);

        // return token;
        return h.response(token);
      },
    });
  },
};

export default plugin;
