import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { Domain, SubDomain } from "./masters/domain.schema";
import { Industry } from "./masters/industry.schema";
import { Location } from "./masters/location.schema";
import { Qualification } from "./masters/qualification.schema";
import { Skill } from "./masters/skills.schema";
import {
  UserExpInYearMonths,
  UserExpInYearMonthsInput,
} from "./common/user_exp.schema";
import { User } from "./user.schema";

export enum EmployerJobTypeEnum {
  "Fulltime" = "Fulltime",
  "Contract" = "Contract",
  "Project" = "Project",
}

export enum EmployerJobStatusEnum {
  "Open" = "Open",
  "Closed" = "Closed",
}

registerEnumType(EmployerJobTypeEnum, {
  name: "EmployerJobTypeEnum",
  description: "Enum For Type of job like fulltime, part-time, contract, etc.",
});

registerEnumType(EmployerJobStatusEnum, {
  name: "EmployerJobStatusEnum",
  description: "Enum For status of job like open or closed",
});

@plugin(mongooseAutoPopulate)
@ObjectType()
export class EmployerJob {
  @Field(() => ID)
  _id: string;

  @Field(() => User)
  @prop({ ref: () => User, autopopulate: true })
  user: Ref<User>;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  jobTitle: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  jobDesc: string;

  @Field(() => EmployerJobTypeEnum, { nullable: true })
  @prop({ default: null })
  jobType: EmployerJobTypeEnum;

  @Field(() => EmployerJobStatusEnum, { nullable: true })
  @prop({ default: null })
  jobStatus: EmployerJobStatusEnum;

  @Field(() => Boolean, { nullable: true })
  @prop({ default: false })
  listingComplete: boolean;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  radius: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  latitude: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  longitude: number;

  @Field(() => Location, { nullable: true })
  @prop({ ref: () => Location, autopopulate: true, default: null })
  location: Ref<Location>;

  @Field(() => Qualification, { nullable: true })
  @prop({ ref: () => Qualification, autopopulate: true, default: null })
  qualification: Ref<Qualification>;

  @Field(() => Industry, { nullable: true })
  @prop({ ref: () => Industry, autopopulate: true, default: null })
  industry: Ref<Industry>;

  @Field(() => Domain, { nullable: true })
  @prop({ ref: () => Domain, autopopulate: true, default: null })
  domain: Ref<Domain>;

  @Field(() => SubDomain, { nullable: true })
  @prop({ ref: () => SubDomain, autopopulate: true, default: null })
  subDomain: Ref<SubDomain>;

  @Field(() => [Skill])
  @prop({ ref: () => Skill, autopopulate: true, default: [] })
  skills: Ref<Skill>[];

  @Field(() => UserExpInYearMonths, { nullable: true })
  @prop({ type: UserExpInYearMonths, default: null })
  minRequiredExp: UserExpInYearMonths;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  minPay: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  maxPay: number;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const EmployerJobModel = getModelForClass(EmployerJob, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class EmployerJobInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  jobTitle?: string;

  @Field(() => String, { nullable: true })
  jobDesc?: string;

  @Field(() => EmployerJobTypeEnum, { nullable: true })
  jobType?: EmployerJobTypeEnum;

  @Field(() => EmployerJobStatusEnum, { nullable: true })
  jobStatus?: EmployerJobStatusEnum;

  @Field(() => Boolean, { nullable: true })
  listingComplete?: boolean;

  @Field(() => Number, { nullable: true })
  radius?: number;

  @Field(() => Number, { nullable: true })
  latitude?: number;

  @Field(() => Number, { nullable: true })
  longitude?: number;

  @Field(() => ID, { nullable: true })
  location?: string;

  @Field(() => ID, { nullable: true })
  qualification?: string;

  @Field(() => ID, { nullable: true })
  industry?: string;

  @Field(() => ID, { nullable: true })
  domain?: string;

  @Field(() => ID, { nullable: true })
  subDomain?: string;

  @Field(() => [ID], { nullable: true })
  skills?: string[];

  @Field(() => UserExpInYearMonthsInput, { nullable: true })
  minRequiredExp?: UserExpInYearMonthsInput;

  @Field(() => Number, { nullable: true })
  minPay?: number;

  @Field(() => Number, { nullable: true })
  maxPay?: number;
}
