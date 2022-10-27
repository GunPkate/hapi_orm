"use strict";

import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";
import { User } from "../Entities/UserModel";
import moment from "moment";
// import { Login } from "../model/login";

const plugin = {
  name: "user",
  version: "1.0.0",
  register: async function (server: Server, options: RouteOptions) {
    server.route({
      method: "GET",
      path: "/findall/{page}",
      handler: async (request: Request, h: ResponseToolkit) => {
        const findall = await User.find();
        const limit = 20;
        const show = request.params.page - 1;
        const page = Math.ceil(findall.length / limit);
        if (show + 1 > page) return h.response("Page not found").code(404);
        //skip  0  1
        //page  1  2
        // 1 -10 => page * 10 (limit)
        const find = await User.find({
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
      },
    });

    server.route({
      method: "POST",
      path: "/login",
      handler: async (request: Request, h: ResponseToolkit) => {
        const login: any = request.payload; //should define paylaod by interface
        const time = new Date();
        const result = await User.create({
          //User.Insert datetime null?
          firstname: login.firstname,
          lastname: login.lastname,
          // datetime: moment().format("YYYY/MM/D HH:mm"),
          // datetime: new Date(),
        });
        result.save();
        console.log(result);
        // console.log(request.payload);
        // console.log(login.firstname);

        return h.response(result);
      },
    });
  },
};

export default plugin;
