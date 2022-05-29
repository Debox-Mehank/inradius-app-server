import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Domain, SubDomain } from "./masters/domain.schema";
import { Industry } from "./masters/industry.schema";
import { Location } from "./masters/location.schema";
import { Qualification } from "./masters/qualification.schema";
import { Skill } from "./masters/skills.schema";
import { UserExpInYearMonths } from "./common/user_exp.schema";
import { User } from "./user.schema";

@plugin(mongooseAutoPopulate)
@ObjectType()
export class EmployerJob {
  @Field(() => ID)
  _id: string;

  @Field(() => User)
  @prop({ ref: () => User, autopopulate: true })
  user: Ref<User>;

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
  totalExp: UserExpInYearMonths;

  @Field(() => UserExpInYearMonths, { nullable: true })
  @prop({ type: UserExpInYearMonths, default: null })
  relevantExp: UserExpInYearMonths;

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
  _id?: string;

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

  @Field(() => UserExpInYearMonths, { nullable: true })
  totalExp?: UserExpInYearMonths;

  @Field(() => UserExpInYearMonths, { nullable: true })
  relevantExp?: UserExpInYearMonths;

  @Field(() => Number, { nullable: true })
  minPay?: number;

  @Field(() => Number, { nullable: true })
  maxPay?: number;
}
