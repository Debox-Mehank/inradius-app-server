import { ApolloError } from "apollo-server";
import { RuleInput, RuleModel, UpdateRuleInput } from "../schema/masters/rule.schema";

class RuleService{
    async addRule(input: RuleInput) {
        try {
          return RuleModel.create(input);
        } catch (error) {
          console.log("Rule Adding ERROR : " + error);
          throw new ApolloError("Error in adding rule!");
        }
      }
      
    async allRule() {
      return RuleModel.find({});
    }

    async updateRule(input: UpdateRuleInput) {
      try {
        return await RuleModel.findByIdAndUpdate(
          input.id,
          { weightage: input.weightage, type: input.type, match: input.matchType },
          { new: true }
        );
      } catch (error) {
        console.log("Rule Updating ERROR", error);
        throw new ApolloError("Error in updating rule!");
      }
    }
}
export default RuleService;
