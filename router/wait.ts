"use strict";
import Boom from "@hapi/boom";
import { ResponseToolkit, RouteOptions, Server, Request } from "@hapi/hapi";

const plugin = {
  name: "wait",
  version: "1.0.0",
  register: async function (server: Server, options: RouteOptions) {
    server.route({
      method: "POST",
      path: "/wait/{time}",
      handler: async (request, h) => {
        const check = request.params.time;
        const wait = await new Promise((resolve, reject) =>
          setTimeout(() => {
            const result = check / 1000;
            if (check <= 5000 && check >= 0) {
              resolve(h.response(result + "").code(204)); // 200 response / 204 no response
            } else {
              // resolve(h.response("wait more than 5 sec").code(406));
              let err = new Error("wait > 5sec");
              resolve(Boom.boomify(err, { statusCode: 406 }));
            }
          }, check)
        );
        return wait;
      },
    });
  },
};

export default plugin;
