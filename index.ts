import server from "./server";
import { ResponseToolkit, Request } from "@hapi/hapi";
import test from './router/test'

const init = async () => {
  await server.register(test);
  await server.start();
  console.log(server.info.uri);
};

init();
