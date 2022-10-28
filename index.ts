import server from "./server";
import userlog from "./router/userlog";
import user from "./router/user";
import sum from "./router/sum";
import intern from "./Mysql/intern";
import local from "./Mysql/local";
import wait from "./router/wait";

const init = async () => {
  await server.register({
    plugin: userlog,
  });
  await server.register(user);
  await server.register(sum);
  await server.register(wait);
  await server.start();
  console.log(server.info.uri);
};

// intern.initialize();
local.initialize();
init().then();
