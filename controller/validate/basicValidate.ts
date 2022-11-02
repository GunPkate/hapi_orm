import { ResponseToolkit, Request } from "@hapi/hapi";
import { hash } from "bcrypt";
import { User } from "../../Entities/UserModels";
import local_dataSource from "../../Mysql/local";
export const basicValidate = () => {
  const userRepo = local_dataSource.getRepository(User);
  return async (
    request: Request,
    username: string,
    password: string,
    h: ResponseToolkit
  ) => {
    const user: User | any = await userRepo.find();
    if (!user) {
      return { credentials: null, isValid: false };
    }

    // const isVlaid = await hash(password,user.salt) === user.password
    const isVlaid = true;
    return { credentials: user, isVlaid };
  };
};
