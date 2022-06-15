import { getModelForClass, prop, pre, index } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";

export enum UserRole {
  employee = "employee",
  employer = "employer",
}

export enum UserStatus {
  pending = "pending",
  active = "active",
  paymentPending = "paymentPending",
  penaltyPending = "penaltyPending",
  blockedByAdmin = "blockedByAdmin",
  inactive = "inactive",
  hired = "hired",
  // deactivedByAdmin = "deactivedByAdmin",
  // deactivedByPaymentFailure = "deactivedByPaymentFailure",
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "Enum For Type of User Roles i.e. Employer & Employee",
});

registerEnumType(UserStatus, {
  name: "UserStatus",
  description: "Enum For Type of User Status",
});

@pre<User>("save", async function () {
  // check if password is being modified
  if (!this.isModified("password")) {
    return;
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@index({ email: 1 })
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  firstName: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  lastName: string;

  @Field(() => String)
  @prop({ required: true, unique: true, trim: true })
  email: string;

  @Field(() => String)
  @prop({ required: true, unique: true, trim: true })
  number: string;

  @prop({ required: true, trim: true })
  password: string;

  @Field(() => String, { nullable: true })
  @prop({ default: null })
  image: string;

  @Field(() => UserRole)
  @prop({ required: true })
  type: UserRole;

  @Field(() => UserStatus)
  @prop({ required: false, default: UserStatus.pending })
  userStatus: UserStatus;

  @Field(() => Boolean)
  @prop({ required: true, default: false })
  isAccountVerified: boolean;

  @Field(() => Boolean)
  @prop({ required: true, default: false })
  isProfileCompleted: boolean;

  @Field(() => Boolean)
  @prop({ required: true, default: false })
  isSurveyCompleted: boolean;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  lastLoggedIn: Date;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  lastLoggedOut: Date;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class RegisterInput {
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;

  @MinLength(10, {
    message: "Mobile number should be of 10 digits!",
  })
  @MaxLength(10, {
    message: "Mobile number should be of 10 digits!",
  })
  @Field(() => String, { nullable: false })
  number: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => UserRole)
  type: UserRole;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@InputType()
export class EmailVerifyInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  token: string;
}

@InputType()
export class ResendEmailVerifyInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  token: string;
}

// @InputType()
// export class UpdateUserStatusInput {
//   @Field(() => UserStatus)
//   userStatus: UserStatus;
// }
