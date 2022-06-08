import { ApolloError } from "apollo-server";
import { Interests, InterestsModel } from "../schema/interests.schema";
import { UserRole } from "../schema/user.schema";
import Context from "../types/context";
import { getEmployeeId, getEmployerId, getUserById } from "../utils/helper";

class InterestsService {
  async markInterest(
    ctx: Context,
    interest: Boolean,
    employeeId?: String,
    employerId?: String,
    jobId?: String
  ): Promise<Boolean> {
    if (!ctx.user) {
      throw new ApolloError("Internal Server Error");
    }

    const user = await getUserById(ctx.user);

    try {
      if (user?.type === UserRole.employee) {
        if (!employerId && !jobId) {
          throw new ApolloError("Something went wrong!");
        }

        const empl = await getEmployeeId(user._id);

        const check = await InterestsModel.findOne({
          employeeId: empl,
          employerId: employerId,
          jobId: jobId,
          $or: [{ employee: true }, { employee: false }],
        });

        if (check) {
          return false;
        }

        const check2 = await InterestsModel.findOne({
          employeeId: empl,
          employerId: employerId,
          jobId: jobId,
          $or: [{ employer: true }, { employer: false }],
        });

        if (check2) {
          await InterestsModel.findOneAndUpdate(
            {
              employeeId: empl,
              employerId: employerId,
              jobId: jobId,
              $or: [{ employer: true }, { employer: false }],
            },
            { $set: { employee: interest } },
            { new: true }
          );

          return true;
        }

        await InterestsModel.create({
          employeeId: empl,
          employerId: employerId,
          jobId: jobId,
          employee: interest,
        });
      } else if (user?.type === UserRole.employer) {
        // Employer
        if (!employeeId && !jobId) {
          throw new ApolloError("Something went wrong!");
        }

        const emplr = await getEmployerId(user._id);

        // Check if previously added
        const check = await InterestsModel.findOne({
          employeeId: employeeId,
          employerId: emplr,
          jobId: jobId,
          $or: [{ employer: true }, { employer: false }],
        });

        if (check) {
          return false;
        }

        const check2 = await InterestsModel.findOne({
          employeeId: employeeId,
          employerId: emplr,
          jobId: jobId,
          $or: [{ employee: true }, { employee: false }],
        });

        if (check2) {
          await InterestsModel.findOneAndUpdate(
            {
              employeeId: employeeId,
              employerId: emplr,
              jobId: jobId,
              $or: [{ employee: true }, { employee: false }],
            },
            { $set: { employer: interest } },
            { new: true }
          );

          return true;
        }

        await InterestsModel.create({
          employeeId: employeeId,
          employerId: emplr,
          jobId: jobId,
          employer: interest,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new ApolloError("Internal Server Error");
    }
  }

  async getMyInterests(ctx: Context): Promise<Interests[]> {
    if (!ctx.user) {
      throw new ApolloError("Internal Server Error");
    }

    const user = await getUserById(ctx.user);

    if (user?.type === UserRole.employee) {
      // Employee Interests
      const employee = await getEmployeeId(user._id);
      const allInterests = await InterestsModel.find({
        employeeId: employee,
        employee: true,
        employer: null,
      });
      return allInterests;
    } else if (user?.type === UserRole.employer) {
      // Employer Interests
      const employer = await getEmployerId(user._id);
      const allInterests = await InterestsModel.find({
        employerId: employer,
        employer: true,
        employee: null,
      });
      return allInterests;
    } else {
      return [];
    }
  }

  async getShownInterests(ctx: Context): Promise<Interests[]> {
    if (!ctx.user) {
      throw new ApolloError("Internal Server Error");
    }

    const user = await getUserById(ctx.user);

    if (user?.type === UserRole.employee) {
      // Employee Interests
      const employee = await getEmployeeId(user._id);
      const allInterests = await InterestsModel.find({
        employeeId: employee,
        employee: null,
        employer: true,
      });
      return allInterests;
    } else if (user?.type === UserRole.employer) {
      // Employer Interests
      const employer = await getEmployerId(user._id);
      const allInterests = await InterestsModel.find({
        employerId: employer,
        employer: null,
        employee: true,
      });
      return allInterests;
    } else {
      return [];
    }
  }

  async getMatched(ctx: Context): Promise<Interests[]> {
    if (!ctx.user) {
      throw new ApolloError("Internal Server Error");
    }

    const user = await getUserById(ctx.user);

    if (user?.type === UserRole.employee) {
      // Employee Interests
      const employee = await getEmployeeId(user._id);
      const allMatched = await InterestsModel.find({
        employeeId: employee,
        employee: true,
        employer: true,
      });
      return allMatched;
    } else if (user?.type === UserRole.employer) {
      // Employer Interests
      const employer = await getEmployerId(user._id);
      const allMatched = await InterestsModel.find({
        employerId: employer,
        employer: true,
        employee: true,
      });
      return allMatched;
    } else {
      return [];
    }
  }
}

export default InterestsService;
