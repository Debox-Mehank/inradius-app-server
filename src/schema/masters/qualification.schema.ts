import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@index({ industry: 1 })
@ObjectType()
export class Qualification {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true, unique: true })
  qualification: string;

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
}
