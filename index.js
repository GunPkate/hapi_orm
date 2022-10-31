const hapi = require("@hapi/hapi");
const path = require("path");
const server = hapi.server({
  port: 3000,
  host: "localhost",
});

const init = async () => {
  await server.register([{ plugin: require("@hapi/inert") }]);

  await server.route({
    method: "GET",
    path: "/test",

    handler: function (request, h) {
      return h.file("./index.html");
    },
  });

  await server.route({
    method: "POST",
    path: "/login",

    handler: function (request, h) {
      console.log(request.payload);
      // return h.file("./index,html");
      return h.response(request.payload);
    },
  });
  await server.route({
    method: "GET",
    path: "/user",

    handler: function (request, h) {
      console.log(request.payload);
      // return h.file("./index,html");
      return "<h1>Hello user</h1>";
    },
  });
  await server.start();
  console.log(server.info.uri);
};

// let http = require("http");

// function show() {
//   let x = document.getElementById("user").value;
//   let y = document.getElementById("password").value;

//   let z = document.getElementById("login").value;
//   console.log(x, y, z);
// }

init();
