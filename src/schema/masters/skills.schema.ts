import {
  getModelForClass,
  index,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { SubDomain } from "./domain.schema";

@plugin(mongooseAutoPopulate)
@index({ skill: 1 })
@ObjectType()
export class Skill {
  @Field(() => ID)
  _id: string;

  @Field(() => SubDomain, { nullable: false })
  @prop({
    required: true,
    trim: true,
    ref: () => SubDomain,
    autopopulate: true,
  })
  subDomain: Ref<SubDomain>;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  skill: string;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const SkillModel = getModelForClass(Skill, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class SkillInput {
  @Field(() => String, { nullable: false })
  subDomain: string;

  @Field(() => String, { nullable: false })
  skill: string;
}
