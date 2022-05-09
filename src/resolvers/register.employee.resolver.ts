import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { RegisterEmployee, RegisterEmployeeInput } from "../schema/register.employee.schema";
import RegisterEmployeeService from "../service/register.employee.service";
import { isAuth } from "../utils/permissions";

@Resolver()
export default class RegisterEmployeeResolver {

    constructor(private service: RegisterEmployeeService) {
        this.service = new RegisterEmployeeService()
    }

    @Mutation(() => RegisterEmployee)
    @UseMiddleware(isAuth)
    registerEmployee(@Arg('input') input: RegisterEmployeeInput) {
        return this.service.registerEmployee(input)
    }
}