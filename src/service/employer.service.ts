import { ApolloError } from "apollo-server";
import {
  Employer,
  EmployerModel,
  UpdateEmployerInput,
  UpdateEmployerVerifyInput,
} from "../schema/employer.schema";
import {
  EmployerJob,
  EmployerJobInput,
  EmployerJobModel,
} from "../schema/employer_jobs.schema";
import Context from "../types/context";

class EmployerService {
  async verifyEmployer(input: UpdateEmployerVerifyInput) {
    try {
      await EmployerModel.findOneAndUpdate(
        { _id: input._id },
        { $set: { employerVerified: input.employerVerified } },
        { new: true }
      );
      return true;
    } catch (error) {
      console.log("Error in getting employer details : " + error);
      throw new ApolloError("Error in getting employer details!");
    }
  }

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
    // Update Employer Job Details
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

  async addEmployerJob(context: Context) {
    try {
      // Create new employer job
      const job = await EmployerJobModel.create({ user: context.user });
      // Update Employer Details
      return EmployerModel.findOneAndUpdate<Employer>(
        { user: context.user },
        {
          $push: { jobs: job._id },
        },
        { new: true }
      );
    } catch (error) {
      console.log("Error in adding employer job : " + error);
      throw new ApolloError("Error in adding employer job");
    }
  }
}

export default EmployerService;
