import { getModelForClass, index, plugin, prop } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { SubDomain } from "./domain.schema";

@plugin(mongooseAutoPopulate)
@index({ skill: 1 })
@ObjectType()
export class Skill {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  skill: string;

  @Field(() => Boolean)
  @prop()
  active: boolean;
  
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
  skill: string;
}
