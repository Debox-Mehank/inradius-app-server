import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Rule, RuleInput, UpdateRuleInput } from "../schema/masters/rule.schema";
import RuleService from "../service/rule.service";
import { isAdmin, isAuth } from "../utils/permissions";

@Resolver()
export default class RuleResolver {
  constructor(private service: RuleService) {
    this.service = new RuleService();
  }

  @Mutation(() => Rule)
  @UseMiddleware([isAuth, isAdmin])
  addRule(@Arg("input") input: RuleInput) {
    return this.service.addRule(input);
  }

  @Query(() => [Rule])
  @UseMiddleware([isAuth])
  allRule() {
    return this.service.allRule();
  }

  @Mutation(() => Rule)
  @UseMiddleware([isAuth, isAdmin])
  updateRule(@Arg("input") input: UpdateRuleInput) {
    return this.service.updateRule(input);
  }

}