import { DataSource } from "typeorm";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { hash } from "bcrypt";
import { User } from "../../Entities/UserModels";

export const jwtValidate = (connect: DataSource) => {
  return async ({ id }: Partial<User>, request: Request, h: ResponseToolkit) => {
    // const user = await User.findOne(id);
    // if (!user) {
    //   return { isValid: false };
    // }
    return { isValid: true };
  };
};

export const basicValidate = (connect: DataSource) => {
  return async (
    request: Request,
    username: string,
    password: string,
    h: ResponseToolkit
  ) => {
    const user = await User.findOne({ where: { firstname: username } });
    if (!user) {
      return { credentials: null, isValid: false };
    }

    // const isVlaid = await hash(password,user.salt) === user.password
    const isValid = true;
    return { credentials: user, isValid };
  };
};
