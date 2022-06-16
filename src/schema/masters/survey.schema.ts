import { getModelForClass, index, mongoose, prop } from "@typegoose/typegoose";
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";

export enum SurveyType {
  employee = "employee",
  employer = "employer",
}

registerEnumType(SurveyType, {
  name: "SurveyType",
  description: "Enum For Type of Survey User Roles i.e. Employer & Employee",
});

@index({ survey: 1 })
@ObjectType()
export class Survey {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  question: string;

  @Field(() => [String], { nullable: false })
  @prop({ type: String, required: true, default: [] })
  options: mongoose.Types.Array<string>;

  @Field(() => SurveyType)
  @prop({ required: true })
  type: SurveyType;

  @Field(() => Boolean)
  @prop({ default: true })
  active: boolean;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const SurveyModel = getModelForClass(Survey, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class SurveyInput {
  @Field(() => String, { nullable: false })
  question: string;

  @Field(() => [String], { nullable: false })
  options: string[];

  @Field(() => SurveyType)
  type: SurveyType;

  @Field(() => Boolean, {nullable: true})
  active: boolean;
}

@InputType()
export class UpdateSurveyInput {
  @Field(() => ID, {nullable: false})
  id: String

  @Field(() => String, { nullable: true })
  question: string;

  @Field(() => [String], {nullable: true})
  options: string[];

  @Field(() => Boolean, {nullable: true})
  active: boolean;
}
