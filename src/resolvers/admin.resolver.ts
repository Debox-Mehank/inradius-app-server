import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  AdminRegisterInput,
  AdminLoginInput,
  Admin,
} from "../schema/admin.schema";
import { Employee } from "../schema/employee.schema";
import { Employer } from "../schema/employer.schema";
import AdminService from "../service/admin.service";
import Context from "../types/context";
import { isAdmin, isAuth } from "../utils/permissions";

@Resolver()
export default class AdminResolver {
  constructor(private adminService: AdminService) {
    this.adminService = new AdminService();
  }

  @Mutation(() => Admin)
  adminRegister(@Arg("input") input: AdminRegisterInput) {
    return this.adminService.createAdmin(input);
  }

  @Query(() => String)
  adminLogin(@Arg("input") input: AdminLoginInput, @Ctx() context: Context) {
    return this.adminService.loginAdmin(input, context);
  }

  @Query(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  adminLogout(@Ctx() context: Context) {
    return this.adminService.logoutAdmin(context);
  }

  @Query(() => [Employee])
  @UseMiddleware([isAuth, isAdmin])
  getAllEmployees() {
    return this.adminService.getAllEmployees();
  }

  @Query(() => [Employer])
  @UseMiddleware([isAuth, isAdmin])
  getAllEmployers() {
    return this.adminService.getAllEmployers();
  }
}
