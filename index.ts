import inert from "@hapi/inert";
import server from "./server";
import userlog from "./plugin/userlog";
import user from "./plugin/user";
// import { authen } from "./router/authen";
import sum from "./plugin/sum";
import intern from "./Mysql/intern";
import local from "./Mysql/local";
import wait from "./plugin/wait";
import { authController } from "./controller/authController";
import { basicValidate, jwtValidate } from "./controller/validate/Validate";

// const connect = intern;
const connect = local;
const init = async () => {
  // await server.register(authen);
  await server.register(require("hapi-auth-jwt2"));
  await server.register(require("@hapi/basic"));

  // server.auth.strategy("simple", "basic", { validate: basicValidate(connect) });
  server.auth.strategy("jwt", "jwt", {
    key: "secret",
    validate: jwtValidate(connect),
  });
  await server.route(authController(connect));
  await server.register({
    plugin: userlog,
  });
  await server.register([inert, user]);
  await server.register(sum);
  await server.register(wait);
  await server.start();
  console.log(server.info.uri);
};

connect.initialize();

init().then();
