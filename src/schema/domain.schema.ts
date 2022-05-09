import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose"
import { Field, ID, InputType, ObjectType } from "type-graphql"
import { Industry } from "./industry.schema"

@index({ domain: 1 })
@ObjectType()
export class Domain {
    @Field(() => ID)
    _id: string

    @Field(() => String, { nullable: false })
    @prop({ required: true, trim: true })
    domain: string

    @Field(() => Industry, { nullable: false })
    @prop({ required: true, trim: true, ref: () => Industry })
    industry: Ref<Industry>
}

export const DomainModel = getModelForClass(Domain, { schemaOptions: { timestamps: true } })

@InputType()
export class DomainInput {
    @Field(() => String, { nullable: false })
    industry: string

    @Field(() => String, { nullable: false })
    domain: string
}