import { getModelForClass, index, mongoose, prop } from "@typegoose/typegoose"
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql"

export enum SurveyType {
    employee = "employee",
    employer = "employer"
}

registerEnumType(SurveyType, { name: "SurveyType", description: "Enum For Type of Survey User Roles i.e. Employer & Employee" })

@index({ industry: 1 })
@ObjectType()
export class Survey {
    @Field(() => ID)
    _id: string

    @Field(() => String, { nullable: false })
    @prop({ required: true, trim: true })
    question: string

    @Field(() => [String], { nullable: false })
    @prop({ type: String, required: true, default: [] })
    options: mongoose.Types.Array<string>;

    @Field(() => SurveyType)
    @prop({ required: true })
    type: SurveyType
}

export const SurveyModel = getModelForClass(Survey, { schemaOptions: { timestamps: true } })

@InputType()
export class SurveyInput {
    @Field(() => String, { nullable: false })
    question: string

    @Field(() => [String], { nullable: false })
    options: string[]

    @Field(() => SurveyType)
    type: SurveyType
}