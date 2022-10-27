"use strict";

import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";

const plugin = {
  name: "wait",
  version: "1.0.0",
  register: async function (server: Server, options: RouteOptions) {
    // server.route({
    //   method: "POST",
    //   path: "/wait/{time}",
    //   handler: async (request: Request, h: ResponseToolkit) => {
    //     const check = request.params.time;
    //     const wait = await new Promise((resolve, reject) =>
    //       setTimeout(() => {
    //         if (check < 5000 && check >= 0) {
    //           resolve(h.response(`${request.params.time}!`).code(200));
    //         } else {
    //           reject(h.response().code(406));
    //         }
    //       })
    //     );
    //     return wait;
    //   },
    // });

    server.route({
      method: "POST",
      path: "/wait/{time}",
      handler: async (request, h) => {
        const check: number = request.params.time;
        const wait = await new Promise((resolve, reject) =>
          setTimeout(() => {
            const result: number = check / 1000;
            if (check <= 5000 && check >= 0) {
              resolve(h.response("wait ").code(204));
            } else {
              reject(h.response(result + "").code(406));
            }
          }, check)
        );
        //     return wait;
        return wait;
      },
    });
  },
};

export default plugin;
