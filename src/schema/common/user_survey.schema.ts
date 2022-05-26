import { plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, InputType, ObjectType } from "type-graphql";
import { Survey } from "../masters/survey.schema";
import { User } from "../user.schema";

// Custom Survey Class
@plugin(mongooseAutoPopulate)
@ObjectType()
export class UserSurvey {
    @Field(() => Survey)
    @prop({ ref: () => Survey, autopopulate: true })
    survey: Ref<Survey>

    @Field(() => String)
    @prop({ required: true })
    selectedOption: string
}

@InputType()
export class UserSurveyInput {
    @Field(() => String)
    survey: string

    @Field(() => String)
    selectedOption: string
}