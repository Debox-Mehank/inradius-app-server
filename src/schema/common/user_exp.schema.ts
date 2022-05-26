import { prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

// Custom Survey Class
@ObjectType()
export class UserExpInYearMonths {
    @Field(() => String)
    @prop({ required: true })
    years: string

    @Field(() => String)
    @prop({ required: true })
    months: string
}

@InputType()
export class UserExpInYearMonthsInput {
    @Field(() => String)
    years: string

    @Field(() => String)
    months: string
}