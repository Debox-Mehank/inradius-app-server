import { ApolloError } from "apollo-server";
import { LoginContentInput, LoginContentModel, UpdateLoginContentInput } from "../schema/masters/login.content.schema";
import { UserRole } from "../schema/user.schema";
import Context from "../types/context";

export default class LoginContentService{
    async allLoginContent(ctx: Context) {
        if (ctx.role === UserRole.employee || ctx.role === UserRole.employer) {
        return LoginContentModel.find({active: true});
        } else {
        return LoginContentModel.find({});
        }
      }

    async addLoginContent(input: LoginContentInput) {
        try {
          return LoginContentModel.create(input);
        } catch(error) {
          console.log("Login Content Adding ERROR : " + error);
          throw new ApolloError("Error in adding login content!");
        }
      }

      async updateLoginContent(input: UpdateLoginContentInput) {
        try {
          return await LoginContentModel.findByIdAndUpdate(
            input.id,
            { loginContent: input.loginContent, active: input.active },
            { new: true }
          );
        } catch(error) {
          console.log("Login Content Updating ERROR", error);
          throw new ApolloError("Error in updating login content!");
        }
      }
}