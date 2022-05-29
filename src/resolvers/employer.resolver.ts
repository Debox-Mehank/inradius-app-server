import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Employer, UpdateEmployerInput } from "../schema/employer.schema";
import { EmployerJob, EmployerJobInput } from "../schema/employer_jobs.schema";
import EmployerService from "../service/employer.service";
import Context from "../types/context";
import { isAuth } from "../utils/permissions";

@Resolver()
export default class EmployerResolver {
  constructor(private service: EmployerService) {
    this.service = new EmployerService();
  }

  @Query(() => Employer)
  @UseMiddleware([isAuth])
  getEmployer(@Ctx() context: Context) {
    return this.service.getEmployer(context);
  }

  @Mutation(() => Employer)
  @UseMiddleware([isAuth])
  updateEmployer(
    @Arg("input") input: UpdateEmployerInput,
    @Ctx() context: Context
  ) {
    return this.service.updateEmployer(input, context);
  }

  @Mutation(() => EmployerJob)
  @UseMiddleware([isAuth])
  updateEmployerJob(
    @Arg("input") input: EmployerJobInput,
    @Ctx() context: Context
  ) {
    return this.service.updateEmployerJob(input, context);
  }
}
