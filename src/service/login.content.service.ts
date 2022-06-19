import { ApolloError } from "apollo-server";
import { AdminRole } from "../schema/admin.schema";
import {
  LoginContentInput,
  LoginContentModel,
  UpdateLoginContentInput,
} from "../schema/masters/login.content.schema";
import { UserRole } from "../schema/user.schema";
import Context from "../types/context";

export default class LoginContentService {
  async allLoginContent(ctx: Context) {
    if (
      ctx.user &&
      (ctx.role === AdminRole.master ||
        ctx.role === AdminRole.admin ||
        ctx.role === AdminRole.normal)
    ) {
      return LoginContentModel.find({});
    } else {
      return LoginContentModel.find({ active: true });
    }
  }

  async addLoginContent(input: LoginContentInput) {
    try {
      return LoginContentModel.create(input);
    } catch (error) {
      console.log("Login Content Adding ERROR : " + error);
      throw new ApolloError("Error in adding login content!");
    }
  }

  async updateLoginContent(input: UpdateLoginContentInput) {
    try {
      return await LoginContentModel.findByIdAndUpdate(
        input.id,
        {
          loginContent: input.loginContent,
          imageUrl: input.imageUrl,
          active: input.active,
        },
        { new: true }
      );
    } catch (error) {
      console.log("Login Content Updating ERROR", error);
      throw new ApolloError("Error in updating login content!");
    }
  }
}
