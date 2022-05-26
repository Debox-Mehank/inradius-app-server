import { getModelForClass, mongoose, plugin, prop, Ref } from "@typegoose/typegoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";
import { UserExpInYearMonths, UserExpInYearMonthsInput } from "./common/user_exp.schema";
import { UserSurvey, UserSurveyInput } from "./common/user_survey.schema";
import { UserWorkExp, UserWorkExpInput } from "./common/user_workexp.schema";
import { Domain, SubDomain } from "./masters/domain.schema";
import { Industry } from "./masters/industry.schema";
import { Location } from "./masters/location.schema";
import { Qualification } from "./masters/qualification.schema";
import { Skill } from "./masters/skills.schema";
import { User } from "./user.schema";

export enum EmployeeGenderEnum {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

registerEnumType(EmployeeGenderEnum, { name: "EmployeeGenderEnum", description: "Enum For Gender of Employee" })

@plugin(mongooseAutoPopulate)
@ObjectType()
export class Employee {
    @Field(() => ID)
    _id: string

    @Field(() => User)
    @prop({ ref: () => User, autopopulate: true, unique: true })
    user: Ref<User>

    @Field(() => [UserSurvey])
    @prop({ type: UserSurvey, default: [] })
    userSurvey: mongoose.Types.Array<UserSurvey>

    @Field(() => Number, { nullable: true })
    @prop({ default: null })
    radius: number

    @Field(() => Number, { nullable: true })
    @prop({ default: null })
    latitude: number

    @Field(() => Number, { nullable: true })
    @prop({ default: null })
    longitude: number

    @Field(() => Location, { nullable: true })
    @prop({ ref: () => Location, autopopulate: true, default: null })
    location: Ref<Location>

    @Field(() => Qualification, { nullable: true })
    @prop({ ref: () => Qualification, autopopulate: true, default: null })
    qualification: Ref<Qualification>

    @Field(() => Industry, { nullable: true })
    @prop({ ref: () => Industry, autopopulate: true, default: null })
    industry: Ref<Industry>

    @Field(() => Domain, { nullable: true })
    @prop({ ref: () => Domain, autopopulate: true, default: null })
    domain: Ref<Domain>

    @Field(() => SubDomain, { nullable: true })
    @prop({ ref: () => SubDomain, autopopulate: true, default: null })
    subDomain: Ref<SubDomain>

    @Field(() => [Skill])
    @prop({ ref: () => Skill, autopopulate: true, default: [] })
    skills: Ref<Skill>[]

    @Field(() => Boolean, { nullable: true })
    @prop({ default: false })
    fresher: boolean

    @Field(() => [UserWorkExp])
    @prop({ type: UserWorkExp, default: [] })
    workExp: mongoose.Types.Array<UserWorkExp>

    @Field(() => UserExpInYearMonths, { nullable: true })
    @prop({ type: UserExpInYearMonths, default: null })
    totalExp: UserExpInYearMonths

    @Field(() => UserExpInYearMonths, { nullable: true })
    @prop({ type: UserExpInYearMonths, default: null })
    relevantExp: UserExpInYearMonths

    @Field(() => Number, { nullable: true })
    @prop({ default: 0 })
    currentPay: number

    @Field(() => Number, { nullable: true })
    @prop({ default: 0 })
    expectedPay: number

    @Field(() => String, { nullable: true })
    @prop({ default: null })
    linkedIn: string

    @Field(() => String, { nullable: true })
    @prop({ default: null })
    resume: string

    @Field(() => EmployeeGenderEnum, { nullable: true })
    @prop({ default: null })
    gender: EmployeeGenderEnum

    @Field(() => String, { nullable: true })
    @prop({ default: null })
    currentAddress: string

    @Field(() => Date, { nullable: true })
    @prop({ default: null })
    dob: Date

    @Field(() => String, { nullable: true })
    @prop({ default: null })
    panCard: string

    @Field(() => String, { nullable: true })
    @prop({ default: null })
    aadharCard: string

    @Field(() => [User])
    @prop({ ref: () => User, autopopulate: true })
    interests: Ref<User>[]
}

export const EmployeeModel = getModelForClass(Employee, { schemaOptions: { timestamps: true } })

@InputType()
export class CreateEmployeeInput {
    @Field(() => ID)
    user?: string

    @Field(() => [UserSurveyInput], { nullable: true })
    userSurvey?: UserSurveyInput[]

    @Field(() => Number, { nullable: true })
    radius?: number

    @Field(() => Number, { nullable: true })
    latitude?: number

    @Field(() => Number, { nullable: true })
    longitude?: number

    @Field(() => ID, { nullable: true })
    location?: string

    @Field(() => ID, { nullable: true })
    qualification?: string

    @Field(() => ID, { nullable: true })
    industry?: string

    @Field(() => ID, { nullable: true })
    domain?: string

    @Field(() => ID, { nullable: true })
    subDomain?: string

    @Field(() => [ID], { nullable: true })
    skills?: string[]

    @Field(() => Boolean, { nullable: true })
    fresher?: boolean

    @Field(() => [UserWorkExpInput], { nullable: true })
    workExp?: UserWorkExpInput[]

    @Field(() => UserExpInYearMonthsInput, { nullable: true })
    totalExp?: UserExpInYearMonthsInput

    @Field(() => UserExpInYearMonthsInput, { nullable: true })
    relevantExp?: UserExpInYearMonthsInput

    @Field(() => Number, { nullable: true })
    currentPay?: number

    @Field(() => Number, { nullable: true })
    expectedPay?: number

    @Field(() => String, { nullable: true })
    linkedIn?: string

    @Field(() => String, { nullable: true })
    resume?: string

    @Field(() => EmployeeGenderEnum, { nullable: true })
    gender?: EmployeeGenderEnum

    @Field(() => String, { nullable: true })
    currentAddress?: string

    @Field(() => Date, { nullable: true })
    dob: Date

    @Field(() => String, { nullable: true })
    panCard?: string

    @Field(() => String, { nullable: true })
    aadharCard?: string
}

@InputType()
export class UpdateEmployeeInput {
    @Field(() => [UserSurveyInput], { nullable: true })
    userSurvey?: UserSurveyInput[]

    @Field(() => Number, { nullable: true })
    radius?: number

    @Field(() => Number, { nullable: true })
    latitude?: number

    @Field(() => Number, { nullable: true })
    longitude?: number

    @Field(() => ID, { nullable: true })
    location?: string

    @Field(() => ID, { nullable: true })
    qualification?: string

    @Field(() => ID, { nullable: true })
    industry?: string

    @Field(() => ID, { nullable: true })
    domain?: string

    @Field(() => ID, { nullable: true })
    subDomain?: string

    @Field(() => [ID], { nullable: true })
    skills?: string[]

    @Field(() => Boolean, { nullable: true })
    fresher?: boolean

    @Field(() => [UserWorkExpInput], { nullable: true })
    workExp?: UserWorkExpInput[]

    @Field(() => UserExpInYearMonthsInput, { nullable: true })
    totalExp?: UserExpInYearMonthsInput

    @Field(() => UserExpInYearMonthsInput, { nullable: true })
    relevantExp?: UserExpInYearMonthsInput

    @Field(() => Number, { nullable: true })
    currentPay?: number

    @Field(() => Number, { nullable: true })
    expectedPay?: number

    @Field(() => String, { nullable: true })
    linkedIn?: string

    @Field(() => String, { nullable: true })
    resume?: string

    @Field(() => EmployeeGenderEnum, { nullable: true })
    gender?: EmployeeGenderEnum

    @Field(() => String, { nullable: true })
    currentAddress?: string

    @Field(() => Date, { nullable: true })
    dob: Date

    @Field(() => String, { nullable: true })
    panCard?: string

    @Field(() => String, { nullable: true })
    aadharCard?: string
}