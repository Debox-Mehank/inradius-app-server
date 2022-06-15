import { ApolloError } from "apollo-server";
import { MiddlewareFn } from "type-graphql";
import { UserRole, UserStatus } from "../schema/user.schema";
import Context from "../types/context";
import { getUserById } from "./helper";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.user) {
    throw new ApolloError("You are not authenticated!");
  }

  const user = await getUserById(context.user);
  if (user?.userStatus === UserStatus.blockedByAdmin) {
    throw new ApolloError("Your account is blocked!");
  }

  return await next();
};

export const isAdmin: MiddlewareFn<Context> = async ({ context }, next) => {
  if (
    context.role === UserRole.employee ||
    context.role === UserRole.employer
  ) {
    throw new ApolloError("You are not authorized!");
  }

  return await next();
};
