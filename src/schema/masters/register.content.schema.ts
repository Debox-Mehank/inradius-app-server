import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";

@index({ location: 1 })
@ObjectType()
export class RegisterContent {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  registerContent: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  imageUrl: string;

  @Field(() => Boolean)
  @prop({ default: true })
  active: boolean;

  @Field(() => RegisterContentType)
  @prop({ required: true })
  type: RegisterContentType;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const RegisterContentModel = getModelForClass(RegisterContent, {
  schemaOptions: { timestamps: true },
});

export enum RegisterContentType {
    employee = "employee",
    employer = "employer",
}

registerEnumType(RegisterContentType, {
    name: "RegisterContentType",
    description: "Enum For Type of Register Content i.e. Employer & Employee",
});

@InputType()
export class RegisterContentInput {
  @Field(() => String, { nullable: false })
  registerContent: string;

  @Field(() => String, { nullable: false })
  imageUrl: string;

  @Field(() => RegisterContentType)
  type: RegisterContentType;

  @Field(() => Boolean)
  active: boolean;
}

@InputType()
export class UpdateRegisterContentInput {
  @Field(() => ID, {nullable: false})
  id: String

  @Field(() => String, { nullable: true })
  registerContent: string;

  @Field(() => String, { nullable: true })
  imageUrl: string;
  
  @Field(() => Boolean, {nullable: true})
  active: boolean;
}
