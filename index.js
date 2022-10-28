const hapi = require("@hapi/hapi");

const server = hapi.server({
  port: 3000,
  host: "localhost",
});

const init = async () => {
  server.route({
    method: "GET",
    path: "/test",
    handler: function (request, h) {
      return h.response("test passed");
    },
  });
  await server.start();
  console.log(server.info.uri);
};



init();
