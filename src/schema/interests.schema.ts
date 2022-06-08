import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Employee } from "./employee.schema";
import { Employer } from "./employer.schema";
import { EmployerJob } from "./employer_jobs.schema";

@plugin(mongooseAutoPopulate)
@ObjectType()
export class Interests {
  @Field(() => ID)
  _id: string;

  @Field(() => Employee)
  @prop({ ref: () => Employee, autopopulate: true })
  employeeId: Ref<Employee>;

  @Field(() => Employer)
  @prop({ ref: () => Employer, autopopulate: true })
  employerId: Ref<Employer>;

  @Field(() => EmployerJob)
  @prop({ ref: () => EmployerJob, autopopulate: true })
  jobId: Ref<EmployerJob>;

  @Field(() => Boolean, { nullable: true })
  @prop({ default: null })
  employee: boolean;

  @Field(() => Boolean, { nullable: true })
  @prop({ default: null })
  employer: boolean;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const InterestsModel = getModelForClass(Interests, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class AddInterestsInput {
  @Field(() => ID)
  employeeId: string;

  @Field(() => ID)
  employerId: string;

  @Field(() => ID)
  jobId: string;
}
