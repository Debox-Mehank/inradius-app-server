import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@index({ industry: 1 })
@ObjectType()
export class Industry {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  industry: string;

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

export const IndustryModel = getModelForClass(Industry, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class IndustryInput {
  @Field(() => String, { nullable: false })
  industry: string;

  @Field(() => Boolean)
  active: boolean;
}
