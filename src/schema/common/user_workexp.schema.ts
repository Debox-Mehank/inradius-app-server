import { prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { Survey } from "../masters/survey.schema";

export enum DesignationEnum {
    manager = "manager",
    director = "director",
    techlead = "techlead"
}

registerEnumType(DesignationEnum, { name: "DesignationEnum", description: "Enum For Designation of Employee" })

// Custom WorkExp Class
@ObjectType()
export class UserWorkExp {
    @Field(() => String)
    @prop({ required: true })
    company: string

    @Field(() => DesignationEnum)
    @prop({ required: true })
    designation: DesignationEnum

    @Field(() => String)
    @prop({ required: true })
    desc: String

    @Field(() => Date,)
    @prop({ required: true })
    start: Date

    @Field(() => Date, { nullable: true })
    @prop({ required: false, default: null })
    end: Date

    @Field(() => Boolean)
    @prop({ required: true, default: false })
    current: boolean
}

@InputType()
export class UserWorkExpInput {
    @Field(() => String)
    company: string

    @Field(() => DesignationEnum)
    designation: DesignationEnum

    @Field(() => String)
    desc: string

    @Field(() => Date)
    start: Date

    @Field(() => Date)
    end: Date

    @Field(() => Boolean)
    current: boolean
}