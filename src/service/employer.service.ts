import { ApolloError } from "apollo-server";
import { CreateEmployerInput, Employer, EmployerModel, UpdateEmployerInput, UpdateEmployerJobInput } from "../schema/employer.schema";
import { EmployerJob, EmployerJobModel } from "../schema/employer_jobs.schema";
import Context from "../types/context";

class EmployerService {
    async getEmployer(context: Context) {
        try {
            return EmployerModel.findOne({ user: context.user })
        } catch (error) {
            console.log("Error in getting employer details : " + error)
            throw new ApolloError("Error in getting employer details!")
        }
    }

    async createEmployer(input: CreateEmployerInput) {
        try {
            return EmployerModel.create(input)
        } catch (error) {
            console.log("Error in creating new employer : " + error)
            throw new ApolloError("Error in creating new employer!")
        }
    }

    async updateEmployer(input: UpdateEmployerInput, context: Context) {
        // Update Employer Details
        try {
            return EmployerModel.findOneAndUpdate<Employer>(
                { user: context.user },
                {
                    $set: input
                },
                { new: true }
            )
        } catch (error) {
            console.log("Error in updating employer details : " + error)
            throw new ApolloError("Error in updating employer details!")
        }
    }

    async updateEmployerJob(input: UpdateEmployerJobInput, context: Context) {
        // Update Employer Details
        try {
            return EmployerJobModel.findOneAndUpdate<EmployerJob>(
                { user: context.user },
                {
                    $set: input
                },
                { new: true }
            )
        } catch (error) {
            console.log("Error in updating employer details : " + error)
            throw new ApolloError("Error in updating employer details!")
        }
    }
}

export default EmployerService