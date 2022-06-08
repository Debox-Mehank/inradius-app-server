import {
  getModelForClass,
  mongoose,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { EmployerJob } from "./employer_jobs.schema";
import { UserSurvey, UserSurveyInput } from "./common/user_survey.schema";
import { User } from "./user.schema";
import { Benefit } from "./masters/benefit.schema";

export enum EmployerVerifyStatusEnum {
  "DocumentsPending" = "DocumentsPending",
  "DocumentsUploaded" = "DocumentsUploaded",
}

registerEnumType(EmployerVerifyStatusEnum, {
  name: "EmployerVerifyStatusEnum",
  description: "Enum for steps of employer profile verification",
});

@plugin(mongooseAutoPopulate)
@ObjectType()
export class Employer {
  @Field(() => ID)
  _id: string;

  @Field(() => User)
  @prop({ ref: () => User, autopopulate: true, unique: true })
  user: Ref<User>;

  @Field(() => String, { nullable: true })
  @prop({ default: null, unique: true })
  companyName: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  companyImage: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  companyLetterHead: string;

  @Field(() => [UserSurvey])
  @prop({ type: UserSurvey, default: [] })
  userSurvey: mongoose.Types.Array<UserSurvey>;

  @Field(() => Boolean, { nullable: true })
  @prop({ default: false })
  employerVerified: boolean;

  @Field(() => EmployerVerifyStatusEnum, { nullable: true })
  @prop({ default: false })
  employerVerifyStatus: EmployerVerifyStatusEnum;

  @Field(() => [Benefit], { nullable: true })
  @prop({ ref: () => Benefit, default: [], autopopulate: true })
  benefits: Ref<Benefit>[];

  @Field(() => [EmployerJob], { nullable: true })
  @prop({ ref: () => EmployerJob, default: [], autopopulate: true })
  jobs: Ref<EmployerJob>[];

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  linkedIn: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  gstNo: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  panNo: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  registeredAddress: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  currentAddress: string;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  noOfLocations: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  landline: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  noOfEmployees: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  lastTurnover: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  noOfHiring: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: null })
  attritionRate: number;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const EmployerModel = getModelForClass(Employer, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class UpdateEmployerInput {
  @Field(() => String, { nullable: true })
  companyName?: string;

  @Field(() => String, { nullable: true })
  companyImage: string;

  @Field(() => String, { nullable: true })
  companyLetterHead?: string;

  @Field(() => [UserSurveyInput], { nullable: true })
  userSurvey?: UserSurveyInput[];

  @Field(() => EmployerVerifyStatusEnum, { nullable: true })
  employerVerifyStatus?: EmployerVerifyStatusEnum;

  @Field(() => [ID], { nullable: true })
  benefits?: string[];

  @Field(() => String, { nullable: true })
  linkedIn: string;

  @Field(() => String, { nullable: true })
  gstNo: string;

  @Field(() => String, { nullable: true })
  panNo: string;

  @Field(() => String, { nullable: true })
  registeredAddress: string;

  @Field(() => String, { nullable: true })
  currentAddress: string;

  @Field(() => Number, { nullable: true })
  noOfLocations: number;

  @Field(() => Number, { nullable: true })
  landline: number;

  @Field(() => Number, { nullable: true })
  noOfEmployees: number;

  @Field(() => Number, { nullable: true })
  lastTurnover: number;

  @Field(() => Number, { nullable: true })
  noOfHiring: number;

  @Field(() => Number, { nullable: true })
  attritionRate: number;
}

@InputType()
export class UpdateEmployerVerifyInput {
  @Field(() => ID, { nullable: false })
  _id: string;

  @Field(() => Boolean, { nullable: false })
  employerVerified: Boolean;
}
