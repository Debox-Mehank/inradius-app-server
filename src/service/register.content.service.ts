import { ApolloError } from "apollo-server";
import { RegisterContentInput, RegisterContentModel, RegisterContentType, UpdateRegisterContentInput } from "../schema/masters/register.content.schema";
import { UserRole } from "../schema/user.schema";
import Context from "../types/context";

export default class RegisterContentService{
    async allRegisterContent(registerContentType: RegisterContentType, ctx: Context) {
        if (registerContentType !== null && (ctx.role === UserRole.employee || ctx.role === UserRole.employer)) {
        return RegisterContentModel.find({type: registerContentType.toString(), active: true});
        } else {
        return RegisterContentModel.find({});
        }
      }

    async addRegisterContent(input: RegisterContentInput) {
        try {
          return RegisterContentModel.create(input);
        } catch(error) {
          console.log("Register Content Adding ERROR : " + error);
          throw new ApolloError("Error in adding Register content!");
        }
      }

      async updateRegisterContent(input: UpdateRegisterContentInput) {
        try {
          return await RegisterContentModel.findByIdAndUpdate(
            input.id,
            { registerContent: input.registerContent, imageUrl: input.imageUrl, active: input.active },
            { new: true }
          );
        } catch(error) {
          console.log("Register Content Updating ERROR", error);
          throw new ApolloError("Error in updating Register content!");
        }
      }
}