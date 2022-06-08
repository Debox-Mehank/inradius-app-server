import { plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, ObjectType } from "type-graphql";
import { Employee } from "./employee.schema";
import { Employer } from "./employer.schema";
import { EmployerJob } from "./employer_jobs.schema";
import { User } from "./user.schema";

@ObjectType()
export class DashboardEmployee {
  @Field(() => Number, { nullable: false })
  score: number;

  @Field(() => Employee, { nullable: false })
  employeeId: Employee;

  @Field(() => User, { nullable: false })
  userId: User;
}

@ObjectType()
export class DashboardEmployer {
  @Field(() => Number, { nullable: false })
  score: number;

  @Field(() => Employer, { nullable: false })
  employerId: Employer;

  @Field(() => User, { nullable: false })
  userId: User;

  @Field(() => EmployerJob, { nullable: false })
  jobId: EmployerJob;
}
