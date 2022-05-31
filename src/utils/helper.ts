import { User, UserModel } from "../schema/user.schema";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email: email });
  return user;
};

export const getUserByNumber = async (number: string): Promise<User | null> => {
  const user = await UserModel.findOne({ number: number });
  return user;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await UserModel.findOne({ _id: id });
  return user;
};
