import { ApolloError } from "apollo-server";
import { DashboardEmployer } from "../schema/dashboard.schema";
import { EmployeeModel } from "../schema/employee.schema";
import { EmployerModel } from "../schema/employer.schema";
import { EmployerJobModel } from "../schema/employer_jobs.schema";
import Context from "../types/context";

class DashboardService {
  async employeeExplore(context: Context): Promise<DashboardEmployer[]> {
    var employeeExploreArr: DashboardEmployer[] = [];
    const employee = await EmployeeModel.find({ user: context.user });
    const allEmployers = await EmployerModel.find({ employerVerified: true });

    // Matching Part
    for (let index = 0; index < allEmployers.length; index++) {
      const employer = allEmployers[index];
      for (let jobIndex = 0; jobIndex < employer.jobs.length; jobIndex++) {
        const job = employer.jobs[jobIndex];
      }
    }

    return [];
  }
}

export default DashboardService;
