import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@index({ location: 1 })
@ObjectType()
export class LoginContent {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  loginContent: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  imageUrl: string;

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

export const LoginContentModel = getModelForClass(LoginContent, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class LoginContentInput {
  @Field(() => String, { nullable: false })
  loginContent: string;

  @Field(() => String, { nullable: false })
  imageUrl: string;

  @Field(() => Boolean)
  active: boolean;
}

@InputType()
export class UpdateLoginContentInput {
  @Field(() => ID, {nullable: false})
  id: String

  @Field(() => String, { nullable: true })
  loginContent: string;

  @Field(() => String, { nullable: true })
  imageUrl: string;
  
  @Field(() => Boolean, {nullable: true})
  active: boolean;
}
