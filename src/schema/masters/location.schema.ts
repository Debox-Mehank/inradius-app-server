import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@index({ location: 1 })
@ObjectType()
export class Location {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, trim: true })
  location: string;

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

export const LocationModel = getModelForClass(Location, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class LocationInput {
  @Field(() => String, { nullable: false })
  location: string;

  @Field(() => Boolean)
  active: boolean;
}

@InputType()
export class UpdateLocationInput {

  @Field(() => ID, {nullable: false})
  id: String

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => Boolean, {nullable: true})
  active: boolean;
}
