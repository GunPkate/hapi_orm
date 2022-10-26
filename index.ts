import server from "./server";
import { ResponseToolkit, Request } from "@hapi/hapi";
import test from "./router/test";
import local_dataSource from "./Mysql/local";
import intern from "./Mysql/intern";

const init = async () => {
  await server.register(test);
  await server.start();
  console.log(server.info.uri);
};

// local_dataSource.initialize();
intern.initialize();
init().then();
