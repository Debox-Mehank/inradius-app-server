import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@index({ industry: 1 })
@ObjectType()
export class Benefit {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  benefit: string;

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

export const BenefitModel = getModelForClass(Benefit, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class BenefitInput {
  @Field(() => String, { nullable: false })
  benefit: string;
}
