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
    // Declare an authentication strategy using the jwt scheme.
    // Use keys: with a shared secret key OR json web key set uri.
    // Use verify: To determine how key contents are verified beyond signature.
    // If verify is set to false, the keys option is not required and ignored.
    // The verify: { aud, iss, sub } options are required if verify is not set to false.
    // The verify: { exp, nbf, timeSkewSec, maxAgeSec } parameters have defaults.
    // Use validate: To create a function called after token validation.

    server.auth.strategy("my_jwt_strategy", "jwt", {
      keys: "secret",
      verify: {
        aud: "urn:audience:test",
        iss: "urn:issuer:test",
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 14400, // 4 hours
        timeSkewSec: 15,
      },
      validate: (artifacts: { decoded: { payload: { user: any; }; }; }, request: Request, h: ResponseToolkit) => {
        return {
          isValid: true,
          credentials: { user: artifacts.decoded.payload.user },
        };
      },
    });

    // Set the strategy

    server.auth.default("my_jwt_strategy");
  },
};

export { authen };
