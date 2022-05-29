import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Employee, UpdateEmployeeInput } from "../schema/employee.schema";
import EmployeeService from "../service/employee.service";
import Context from "../types/context";
import { isAuth } from "../utils/permissions";

@Resolver()
export default class EmployeeResolver {
  constructor(private service: EmployeeService) {
    this.service = new EmployeeService();
  }

  @Query(() => Employee)
  @UseMiddleware([isAuth])
  getEmployee(@Ctx() context: Context) {
    return this.service.getEmployee(context);
  }

  @Mutation(() => Employee)
  @UseMiddleware([isAuth])
  updateEmployee(
    @Arg("input") input: UpdateEmployeeInput,
    @Ctx() context: Context
  ) {
    return this.service.updateEmployee(input, context);
  }
}
