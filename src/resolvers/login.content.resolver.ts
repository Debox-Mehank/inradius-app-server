import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  LoginContent,
  LoginContentInput,
  UpdateLoginContentInput,
} from "../schema/masters/login.content.schema";
import LoginContentService from "../service/login.content.service";
import Context from "../types/context";
import { isAdmin, isAuth } from "../utils/permissions";

@Resolver()
export default class LoginContentResolver {
  constructor(private service: LoginContentService) {
    this.service = new LoginContentService();
  }

  @Query(() => [LoginContent])
  allLoginContent(@Ctx() context: Context) {
    return this.service.allLoginContent(context);
  }

  @Mutation(() => LoginContent)
  @UseMiddleware([isAuth, isAdmin])
  addLoginContent(@Arg("input") input: LoginContentInput) {
    return this.service.addLoginContent(input);
  }

  @Mutation(() => LoginContent)
  @UseMiddleware([isAuth, isAdmin])
  updateLoginContent(@Arg("input") input: UpdateLoginContentInput) {
    return this.service.updateLoginContent(input);
  }
}
