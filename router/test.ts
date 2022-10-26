"use strict";

import { ResponseToolkit, RouteOptions, Server ,Request} from "@hapi/hapi";

const plugin = {
  name: "test",
  version: "1.0.0",
  register: async function (server: Server, options:RouteOptions) {
    server.route({
      method: "GET",
      path: "/test",
      handler: function (request: Request, h: ResponseToolkit) {
        return "test passed";
      },
    });
  },
};

export default plugin;
