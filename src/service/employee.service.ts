import { ApolloError } from "apollo-server";
import { CreateEmployeeInput, Employee, EmployeeModel, UpdateEmployeeInput } from "../schema/employee.schema";
import Context from "../types/context";

class EmployeeService {
    async getEmployee(context: Context) {
        try {
            return EmployeeModel.findOne({ user: context.user })
        } catch (error) {
            console.log("Error in getting employee details : " + error)
            throw new ApolloError("Error in getting employee details!")
        }
    }

    async createEmployee(input: CreateEmployeeInput) {
        try {
            return EmployeeModel.create(input)
        } catch (error) {
            console.log("Error in creating new employee : " + error)
            throw new ApolloError("Error in creating new employee!")
        }
    }

    async updateEmployee(input: UpdateEmployeeInput, context: Context) {
        // Update Employee Details
        try {
            return EmployeeModel.findOneAndUpdate<Employee>(
                { user: context.user },
                {
                    $set: input
                },
                { new: true }
            )
        } catch (error) {
            console.log("Error in updating employee details : " + error)
            throw new ApolloError("Error in updating employee details!")
        }
    }
}

export default EmployeeService