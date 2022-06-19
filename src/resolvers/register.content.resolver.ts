import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  RegisterContent,
  RegisterContentInput,
  RegisterContentType,
  UpdateRegisterContentInput,
} from "../schema/masters/register.content.schema";
import RegisterContentService from "../service/register.content.service";
import Context from "../types/context";
import { isAdmin, isAuth } from "../utils/permissions";

@Resolver()
export default class RegisterContentResolver {
  constructor(private service: RegisterContentService) {
    this.service = new RegisterContentService();
  }

  @Query(() => [RegisterContent])
  allRegisterContent(
    @Arg("type", () => RegisterContentType, { nullable: true })
    @Ctx()
    context: Context,
    type?: RegisterContentType
  ) {
    return this.service.allRegisterContent(context, type);
  }

  @Mutation(() => RegisterContent)
  @UseMiddleware([isAuth, isAdmin])
  addRegisterContent(@Arg("input") input: RegisterContentInput) {
    return this.service.addRegisterContent(input);
  }

  @Mutation(() => RegisterContent)
  @UseMiddleware([isAuth, isAdmin])
  updateRegisterContent(@Arg("input") input: UpdateRegisterContentInput) {
    return this.service.updateRegisterContent(input);
  }
}
