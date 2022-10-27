"use strict";

import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";

const plugin = {
  name: "sumnunm",
  version: "1.0.0",
  register: async function (server: Server, options: RouteOptions) {
    server.route({
      method: "POST",
      path: "/sum",
      handler: async (request: Request, h: ResponseToolkit) => {
        const numlist: any = request.payload;
        let sum: number = 0;
        for (let e of numlist.num) sum += e;
        console.log(sum);

        return h.response(`${sum}`).code(220);
      },
    });
  },
};

export default plugin;
