import {
  getModelForClass,
  index,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@index({ domain: 1 })
@ObjectType()
export class Domain {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  domain: string;

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

export const DomainModel = getModelForClass(Domain, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class DomainInput {
  @Field(() => String, { nullable: false })
  domain: string;
}

@plugin(mongooseAutoPopulate as any)
@index({ subDomain: 1 })
@ObjectType()
export class SubDomain {
  @Field(() => ID)
  _id: string;

  @Field(() => Domain, { nullable: false })
  @prop({ required: true, autopopulate: true, trim: true, ref: () => Domain })
  domain: Ref<Domain>;

  @Field(() => String, { nullable: false })
  @prop({ required: true, unique: true, trim: true })
  subDomain: string;

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

export const SubDomainModel = getModelForClass(SubDomain, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class SubDomainInput {
  @Field(() => String, { nullable: false })
  domain: string;

  @Field(() => String, { nullable: false })
  subDomain: string;
}
