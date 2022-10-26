import hapi, { Server } from "@hapi/hapi";

const server: Server = hapi.server({
  port: 3000,
  host: "localhost",
});

export default server;
