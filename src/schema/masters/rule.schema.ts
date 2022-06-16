import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, Float, ID, InputType, ObjectType, registerEnumType } from "type-graphql";

@index({ rule: 1 })
@ObjectType()
export class Rule {
  @Field(() => ID)
  _id: string;

  @Field(() => TypeCriterion)
  @prop({ required: false})
  type: TypeCriterion;

  @Field(() => MatchType)
  @prop()
  matchType: MatchType; 

  @Field(() => Float)
  @prop({ required: false })
  weightage: number;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}

export const RuleModel = getModelForClass(Rule, {
  schemaOptions: { timestamps: true },
});


export enum TypeCriterion {
    locationMatch = "locationMatch",
    radiusMatch = "radiusMatch",
    skillMatch = "skillMatch",
    industryMatch = "industryMatch",
    domainMatch = "domainMatch",
    subDomainMatch = "subDomainMatch",
    salaryRangeMatch = "salaryRangeMatch",
    expRangeMatch = "expRangeMatch"
}

export enum MatchType {
    hardMatch = "hardMatch",
    softMatch = "softMatch"
}

registerEnumType(MatchType, {
    name: "MatchType",
    description: "Enum For Type of Matches i.e. Hard Match for parameters that should be definately matched and soft match for those parameters that would make up the score.",
});

registerEnumType(TypeCriterion, {
    name: "TypeCriterion",
    description: "Enum For Type of Criteria for matching algorithm",
});


@InputType()
export class RuleInput {
  @Field(() => TypeCriterion, { nullable: false })
  type: TypeCriterion;

  @Field(() => Float, { nullable: false })
  weightage: number;

  @Field(() => MatchType, { nullable: false })
  matchType: MatchType; 
}

@InputType()
export class UpdateRuleInput {
  @Field(() => ID, {nullable: false})
  id: String

  @Field(() => TypeCriterion, { nullable: true })
  type: TypeCriterion;

  @Field(() => MatchType, { nullable: true })
  matchType: MatchType; 

  @Field(() => Float, { nullable: false })
  weightage: number;
}
