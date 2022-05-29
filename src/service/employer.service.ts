import { ApolloError } from "apollo-server";
import {
  Employer,
  EmployerModel,
  UpdateEmployerInput,
} from "../schema/employer.schema";
import {
  EmployerJob,
  EmployerJobInput,
  EmployerJobModel,
} from "../schema/employer_jobs.schema";
import Context from "../types/context";

class EmployerService {
  async getEmployer(context: Context) {
    try {
      return EmployerModel.findOne({ user: context.user });
    } catch (error) {
      console.log("Error in getting employer details : " + error);
      throw new ApolloError("Error in getting employer details!");
    }
  }

  async updateEmployer(input: UpdateEmployerInput, context: Context) {
    // Update Employer Details
    try {
      return EmployerModel.findOneAndUpdate<Employer>(
        { user: context.user },
        {
          $set: input,
        },
        { new: true }
      );
    } catch (error) {
      console.log("Error in updating employer details : " + error);
      throw new ApolloError("Error in updating employer details!");
    }
  }

  async updateEmployerJob(input: EmployerJobInput, context: Context) {
    // Update Employer Details
    try {
      return EmployerJobModel.findOneAndUpdate<EmployerJob>(
        { user: context.user, _id: input._id },
        {
          $set: input,
        },
        { new: true }
      );
    } catch (error) {
      console.log("Error in updating employer job details : " + error);
      throw new ApolloError("Error in updating employer job details!");
    }
  }

  // TODO:Implement Add Job Part
  //   async addEmployerJob(input: EmployerJobInput, context: Context) {
  //     // Update Employer Details
  //     try {
  //       return EmployerJobModel.findOneAndUpdate<EmployerJob>(
  //         { user: context.user, _id: input._id },
  //         {
  //           $set: input,
  //         },
  //         { new: true }
  //       );
  //     } catch (error) {
  //       console.log("Error in updating employer job details : " + error);
  //       throw new ApolloError("Error in updating employer job details!");
  //     }
  //   }
}

export default EmployerService;
