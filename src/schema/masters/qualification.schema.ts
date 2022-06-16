import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@index({ qualification: 1 })
@ObjectType()
export class Qualification {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true, unique: true })
  qualification: string;

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

export const QualificationModel = getModelForClass(Qualification, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class QualificationInput {
  @Field(() => String, { nullable: false })
  qualification: string;

  @Field(() => Boolean)
  active: boolean;
}

@InputType()
export class UpdateQualificationInput {

  @Field(() => ID, {nullable: false})
  id: String

  @Field(() => String, { nullable: true })
  qualification: string;

  @Field(() => Boolean, {nullable: true})
  active: boolean;
}
