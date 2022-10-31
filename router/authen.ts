import Boom from "@hapi/boom";
("use strict");

import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";
import { User } from "../Entities/UserModels";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

let isValid = false;
const authen = {
  name: "authen",
  version: "1.0.0",
  congfig: {},
  register: async (server: Server) => {
    let token = "";
    const validateUser = async () => {
      const user: any = {
        firstname: "Gun",
        lastname: "Pun",
        password: "134",
      };
      const exist = await User.find({
        select: { firstname: user.firstname, password: true },
      });

      if (exist) {
        isValid = true;
      }

      return isValid;
    };

    server.auth.strategy("jwt", "jwt", {
      key: "secret",
      validate: validateUser(),
    });

    if (server.auth) {
      server.auth.default("jwt");
    }
  },
};

export { authen };
