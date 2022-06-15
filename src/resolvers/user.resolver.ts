import { ApolloError } from "apollo-server";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  EmailVerifyInput,
  LoginInput,
  RegisterInput,
  UpdateUserStatusInput,
  User,
} from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";
import { getUserById } from "../utils/helper";
import { isAdmin, isAuth } from "../utils/permissions";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  register(@Arg("input") input: RegisterInput) {
    return this.userService.createUser(input);
  }

  @Query(() => Boolean)
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() context: Context) {
    return this.userService.logout(context);
  }

  @Query(() => Boolean)
  verifyEmail(@Arg("input") input: EmailVerifyInput) {
    return this.userService.verifyEmail(input);
  }

  @Query(() => Boolean)
  resendVerifyEmail(@Arg("input") input: EmailVerifyInput) {
    return this.userService.resendVerifyEmail(input);
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  updateUserImage(@Arg("image") image: String, @Ctx() context: Context) {
    return this.userService.updateUserImage(image, context);
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  updateSurveyStatus(@Ctx() context: Context) {
    return this.userService.updateSurveyStatus(context);
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  updateProfileStatus(@Ctx() context: Context) {
    return this.userService.updateProfileStatus(context);
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async user(@Ctx() context: Context) {
    if (context.role === "employee" || context.role === "employer") {
      const user = await getUserById(context.user!);
      return user;
    } else {
      throw new ApolloError("Invalid User!");
    }
  }

  @Query(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  updateUserStatus(@Arg("status") status: UpdateUserStatusInput) {
    return this.userService.updateUserStatus(status);
  }
}
