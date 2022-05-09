import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate"
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./user.schema";
import { Location } from "./location.schema"

@plugin(autopopulate as any)
@ObjectType()
export class RegisterEmployee {
    @Field(() => ID)
    _id: string

    @Field(() => User)
    @prop({ ref: () => User, autopopulate: true, unique: true })
    user: Ref<User>

    @Field(() => Location, { nullable: true })
    @prop({ ref: () => Location, autopopulate: true, default: null })
    location: Ref<Location>
}

export const RegisterEmployeeModel = getModelForClass(RegisterEmployee, { schemaOptions: { timestamps: true } })

@InputType()
export class RegisterEmployeeInput {
    @Field(() => ID)
    user: string

    @Field(() => ID, { nullable: true })
    location: string
}