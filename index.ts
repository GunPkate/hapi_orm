import server from "./server";
import user from "./router/user";
import sum from "./router/sum";
import intern from "./Mysql/intern";
import wait from "./router/wait";
import { userSchema } from "./Joi/UserSchema";

const init = async () => {
  await server.register({
    plugin: user,
  });
  await server.register(sum);
  await server.register(wait);
  await server.start();
  console.log(server.info.uri);
};

intern.initialize();
init().then();
