import { EmployeeModel } from "../schema/employee.schema";
import { EmployerModel } from "../schema/employer.schema";
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

export const getEmployerId = async (id: string): Promise<String | null> => {
  const employer = await EmployerModel.findOne({ user: id });
  return employer?._id.toString() ?? null;
};

export const getEmployeeId = async (id: string): Promise<String | null> => {
  const employee = await EmployeeModel.findOne({ user: id });
  return employee?._id.toString() ?? null;
};
