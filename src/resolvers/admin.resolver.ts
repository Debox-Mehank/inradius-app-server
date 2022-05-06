import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AdminRegisterInput, AdminLoginInput, Admin } from "../schema/admin.schema";
import AdminService from "../service/admin.service"
import Context from "../types/context";

@Resolver()
export default class AdminResolver {

    constructor(private adminService: AdminService) {
        this.adminService = new AdminService()
    }

    @Mutation(() => Admin)
    adminRegister(@Arg('input') input: AdminRegisterInput) {
        return this.adminService.createAdmin(input)
    }

    @Query(() => String)
    adminLogin(@Arg('input') input: AdminLoginInput, @Ctx() context: Context) {
        return this.adminService.loginAdmin(input, context)
    }
}