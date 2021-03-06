import { getModelForClass, index, plugin, prop } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, InputType, ObjectType } from "type-graphql";

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
  @prop({ default: true })
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

  @Field(() => Boolean)
  active: boolean;
}

@InputType()
export class UpdateSkillInput {
  @Field(() => ID, {nullable: false})
  id: String

  @Field(() => String, { nullable: true })
  skill: string;

  @Field(() => Boolean, {nullable: true})
  active: boolean;
}