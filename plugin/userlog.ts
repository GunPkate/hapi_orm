import Boom from "@hapi/boom";
("use strict");

import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";
import { UserLog } from "../Entities/UserLogModel";
import { userLogSchema } from "../Joi/UserLogSchema";
import Joi from "joi";
// import { Login } from "../model/login";

const plugin = {
  name: "userlog",
  version: "1.0.0",
  register: async function (server: Server, options: RouteOptions) {
    server.route({
      method: "GET",
      path: "/userlog/findall/{page}",
      handler: async (request: Request, h: ResponseToolkit) => {
        {
          const findall = await UserLog.find();
          if (findall.length == 0) {
            const error = new Error("No data");
            return Boom.boomify(error, { statusCode: 404 });
          }
          const limit = 20;
          const show = request.params.page - 1;
          const page = Math.ceil(findall.length / limit);
          if (show + 1 > page) return h.response("Page not found").code(404);
          //skip  0  1
          //page  1  2
          // 1 -10 => page * 10 (limit)
          const find = await UserLog.find({
            order: { id: "ASC" },
            skip: show * limit,
            take: limit,
          });
          const result = {
            count: findall.length,
            page: show + 1,
            items: find,
          };
          return h.response(result);
        }
      },
    });

    server.route({
      method: "POST",
      // options: {
      //   validate: {
      //     payload: userSchema,
      //   },
      // },
      path: "/userlog/loginlog",
      handler: async (request: Request, h: ResponseToolkit) => {
        try {
          const login: any = request.payload; //should define paylaod by interface
          const time = new Date();
          const { error, value } = userLogSchema.validate(login);
          if (error) {
            return Boom.boomify(error, { statusCode: 400 });
          }
          if (Joi.valid(login, userLogSchema)) {
            const result = await UserLog.create({
              //User.Insert datetime null?
              firstname: login.firstname,
              lastname: login.lastname,
              // datetime: moment().format("YYYY/MM/D HH:mm"),
              // datetime: new Date(),
            });
            result.save();
            console.log(result);
            return h.response(result);
          }
        } catch (error: any) {
          const err = new Error(error);
          return Boom.boomify(err, { statusCode: 400 });
        }

        // console.log(request.payload);
        // console.log(login.firstname);
      },
    });

    // server.route({
    //   method: "POST",
    //   path: "login",
    //   handler: (requset, h) => {

    //   },
    // });
  },
};

export default plugin;
