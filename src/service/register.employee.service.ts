import { ApolloError } from "apollo-server";
import { RegisterEmployeeInput, RegisterEmployeeModel } from "../schema/register.employee.schema";

class RegisterEmployeeService {
    async registerEmployee(input: RegisterEmployeeInput) {
        // Call user model to create user
        return RegisterEmployeeModel.create(input)
    }
}

export default RegisterEmployeeService