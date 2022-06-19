import { isDocument } from "@typegoose/typegoose";
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
  EmployerJobStatusEnum,
} from "../schema/employer_jobs.schema";
import { UserRole } from "../schema/user.schema";
import Context from "../types/context";

class EmployerService {
  async verifyEmployer(input: UpdateEmployerVerifyInput) {
    try {
      const employerReq = await EmployerModel.findOne({ _id: input._id });
      if (!employerReq) {
        console.log("Error in getting employer details");
        throw new ApolloError("Error in getting employer details!");
      }
      if (isDocument(employerReq.user)) {
        // const job = await EmployerJobModel.create({
        //   user: employerReq.user._id,
        //   jobStatus: EmployerJobStatusEnum.Open,
        // });
        await EmployerModel.findOneAndUpdate(
          { _id: input._id },
          {
            $set: { employerVerified: input.employerVerified },
          },
          { new: true }
        );
        return true;
      }
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

  async getEmployerAllJobs(context: Context) {
    try {
      return EmployerJobModel.find({ user: context.user });
    } catch (error) {
      console.log("Error in getting employer jobs : " + error);
      throw new ApolloError("Error in getting employer jobs!");
    }
  }

  async getJobDetails(jobId: string, context: Context) {
    try {
      return EmployerJobModel.findOne({ user: context.user, _id: jobId });
    } catch (error) {
      console.log("Error in getting job details : " + error);
      throw new ApolloError("Error in getting job details!");
    }
  }

  async updateEmployer(input: UpdateEmployerInput, context: Context) {
    // Update Employer Details
    try {
      const upd = await EmployerModel.findOneAndUpdate<Employer>(
        { user: context.user },
        {
          $set: input,
        },
        { new: true }
      );
      return upd;
    } catch (error) {
      console.log("Error in updating employer details : " + error);
      throw new ApolloError("Error in updating employer details!");
    }
  }

  async updateEmployerJob(input: EmployerJobInput, context: Context) {
    // Update Employer Job Details
    try {
      if (context.role === UserRole.employer) {
        return EmployerJobModel.findOneAndUpdate<EmployerJob>(
          { user: context.user, _id: input._id },
          {
            $set: input,
          },
          { new: true }
        );
      } else if (context.role !== UserRole.employee) {
        return EmployerJobModel.findOneAndUpdate<EmployerJob>(
          { _id: input._id },
          {
            $set: input,
          },
          { new: true }
        );
      }
    } catch (error) {
      console.log("Error in updating employer job details : " + error);
      throw new ApolloError("Error in updating employer job details!");
    }
  }

  async addEmployerJob(context: Context) {
    try {
      // Create new employer job
      const job = await EmployerJobModel.create({
        user: context.user,
        jobStatus: EmployerJobStatusEnum.Closed,
      });
      // Update Employer Details
      await EmployerModel.findOneAndUpdate<Employer>(
        { user: context.user },
        {
          $push: { jobs: job._id },
        },
        { new: true }
      );

      return job._id;
    } catch (error) {
      console.log("Error in adding employer job : " + error);
      throw new ApolloError("Error in adding employer job");
    }
  }
}

export default EmployerService;
