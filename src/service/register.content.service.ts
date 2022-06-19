import { ApolloError } from "apollo-server";
import { AdminRole } from "../schema/admin.schema";
import {
  RegisterContent,
  RegisterContentInput,
  RegisterContentModel,
  RegisterContentType,
  UpdateRegisterContentInput,
} from "../schema/masters/register.content.schema";
import Context from "../types/context";

export default class RegisterContentService {
  async allRegisterContent(
    ctx: Context,
    registerContentType?: RegisterContentType
  ) {
    if (
      ctx.user &&
      (ctx.role === AdminRole.master ||
        ctx.role === AdminRole.admin ||
        ctx.role === AdminRole.normal)
    ) {
      return RegisterContentModel.find({});
    } else {
      return RegisterContentModel.find<RegisterContent>({
        type: registerContentType ?? RegisterContentType.employee,
        active: true,
      });
    }
  }

  async addRegisterContent(input: RegisterContentInput) {
    try {
      return RegisterContentModel.create(input);
    } catch (error) {
      console.log("Register Content Adding ERROR : " + error);
      throw new ApolloError("Error in adding Register content!");
    }
  }

  async updateRegisterContent(input: UpdateRegisterContentInput) {
    try {
      return await RegisterContentModel.findByIdAndUpdate(
        input.id,
        {
          registerContent: input.registerContent,
          imageUrl: input.imageUrl,
          active: input.active,
        },
        { new: true }
      );
    } catch (error) {
      console.log("Register Content Updating ERROR", error);
      throw new ApolloError("Error in updating Register content!");
    }
  }
}
