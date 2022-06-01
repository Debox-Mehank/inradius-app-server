import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import {
  DashboardEmployee,
  DashboardEmployer,
} from "../schema/dashboard.schema";
import DashboardService from "../service/dashboard.service";
import Context from "../types/context";
import { isAuth } from "../utils/permissions";

@Resolver()
export default class DashboardResolver {
  constructor(private service: DashboardService) {
    this.service = new DashboardService();
  }

  @Query(() => [DashboardEmployer])
  @UseMiddleware([isAuth])
  async employeeExplore(@Ctx() context: Context): Promise<DashboardEmployer[]> {
    const data: DashboardEmployer[] = await this.service.employeeExplore(
      context
    );
    return data;
  }

  @Query(() => [DashboardEmployee])
  @UseMiddleware([isAuth])
  async employerExplore(
    @Arg("jobId") jobId: String,
    @Ctx() context: Context
  ): Promise<DashboardEmployee[]> {
    const data: DashboardEmployee[] = await this.service.employerExplore(
      jobId,
      context
    );
    return data;
  }
}
