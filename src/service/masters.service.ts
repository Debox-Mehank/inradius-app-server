import { ApolloError } from "apollo-server";
import { BenefitInput, BenefitModel } from "../schema/masters/benefit.schema";
import {
  DomainInput,
  DomainModel,
  SubDomainInput,
  SubDomainModel,
} from "../schema/masters/domain.schema";
import {
  IndustryInput,
  IndustryModel,
} from "../schema/masters/industry.schema";
import {
  LocationInput,
  LocationModel,
} from "../schema/masters/location.schema";
import {
  QualificationInput,
  QualificationModel,
} from "../schema/masters/qualification.schema";
import { SkillInput, SkillModel } from "../schema/masters/skills.schema";
import {
  SurveyInput,
  SurveyModel,
  SurveyType,
} from "../schema/masters/survey.schema";

class MastersService {
  async addLocation(input: LocationInput) {
    try {
      return LocationModel.create(input);
    } catch (error) {
      console.log("Location Adding ERROR : " + error);
      throw new ApolloError("Error in adding location!");
    }
  }

  async addQualification(input: QualificationInput) {
    try {
      return QualificationModel.create(input);
    } catch (error) {
      console.log("Qualification Adding ERROR : " + error);
      throw new ApolloError("Error in adding qualification!");
    }
  }

  async addIndustry(input: IndustryInput) {
    try {
      return IndustryModel.create(input);
    } catch (error) {
      console.log("Industry Adding ERROR : " + error);
      throw new ApolloError("Error in adding industry!");
    }
  }

  async addDomain(input: DomainInput) {
    try {
      return DomainModel.create(input);
    } catch (error) {
      console.log("Domain Adding ERROR : " + error);
      throw new ApolloError("Error in adding domain!");
    }
  }

  async addSubDomain(input: SubDomainInput) {
    try {
      return SubDomainModel.create(input);
    } catch (error) {
      console.log("SubDomain Adding ERROR : " + error);
      throw new ApolloError("Error in adding sub-domain!");
    }
  }

  async addSkill(input: SkillInput) {
    try {
      return SkillModel.create(input);
    } catch (error) {
      console.log("Skill Adding ERROR : " + error);
      throw new ApolloError("Error in adding skill!");
    }
  }

  async addSkills(input: SkillInput[]) {
    try {
      await SkillModel.insertMany(input);
      return true;
    } catch (error) {
      console.log("Skill Adding ERROR : " + error);
      throw new ApolloError("Error in adding skill!");
    }
  }

  async addSurvey(input: SurveyInput) {
    try {
      return SurveyModel.create(input);
    } catch (error) {
      console.log("Survey Adding ERROR : " + error);
      throw new ApolloError("Error in adding survey question!");
    }
  }

  async addBenefit(input: BenefitInput) {
    try {
      return BenefitModel.create(input);
    } catch (error) {
      console.log("Benefit Adding ERROR : " + error);
      throw new ApolloError("Error in adding employer benefit!");
    }
  }

  async allLocation() {
    return LocationModel.find({});
  }

  async allQualifications() {
    return QualificationModel.find({});
  }

  async allIndustries() {
    return IndustryModel.find({});
  }

  async allDomains() {
    return DomainModel.find({});
  }

  async allSubDomains() {
    return SubDomainModel.find({});
  }

  async allSkills() {
    return SkillModel.find({});
  }

  async allSurveyQuestion(surveyType: SurveyType) {
    if (surveyType !== undefined) {
      return SurveyModel.find({ type: surveyType.toString() });
    } else {
      return SurveyModel.find({});
    }
  }

  async allBenefits() {
    return BenefitModel.find({});
  }
}

export default MastersService;
