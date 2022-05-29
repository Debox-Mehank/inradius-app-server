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
}
