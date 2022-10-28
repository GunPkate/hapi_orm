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
        const numlist: Array<number> = request.payload;
        // const numlist: Array<number> = [1, 2, 3, 4];
        let sum: number = 0;
        let finalsum: number = numlist.reduce(
          (previous: number, current: number) => current + previous,
          sum
        );

        return h.response(`${finalsum}`).code(220);
      },
    });
  },
};

export default plugin;
