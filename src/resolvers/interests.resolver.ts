import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Interests } from "../schema/interests.schema";
import InterestsService from "../service/interests.service";
import Context from "../types/context";
import { isAuth } from "../utils/permissions";

@Resolver()
export default class InterestsResolver {
  constructor(private service: InterestsService) {
    this.service = new InterestsService();
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth])
  async markInterest(
    @Arg("employeeId", () => String, { nullable: true }) employeeId: String,
    @Arg("employerId", () => String, { nullable: true }) employerId: String,
    @Arg("jobId", () => String, { nullable: true }) jobId: String,
    @Arg("interest", () => Boolean, { nullable: false }) interest: Boolean,
    @Ctx() context: Context
  ): Promise<Boolean> {
    return await this.service.markInterest(
      context,
      interest,
      employeeId,
      employerId,
      jobId
    );
  }

  @Query(() => [Interests])
  @UseMiddleware([isAuth])
  async getMyInterests(
    @Arg("jobId", () => String, { nullable: true }) jobId: String,
    @Ctx() context: Context
  ): Promise<Interests[]> {
    return this.service.getMyInterests(context);
  }

  @Query(() => [Interests])
  @UseMiddleware([isAuth])
  async getShownInterests(
    @Arg("jobId", () => String, { nullable: true }) jobId: String,
    @Ctx() context: Context
  ): Promise<Interests[]> {
    return this.service.getShownInterests(context, jobId);
  }

  @Query(() => [Interests])
  @UseMiddleware([isAuth])
  async getMatched(
    @Arg("jobId", () => String, { nullable: true }) jobId: String,
    @Ctx() context: Context
  ): Promise<Interests[]> {
    return this.service.getMatched(context, jobId);
  }
}
