import { ApolloError } from "apollo-server";
import {
  BenefitInput,
  BenefitModel,
  UpdateBenefitInput,
} from "../schema/masters/benefit.schema";
import {
  DomainInput,
  DomainModel,
  SubDomainInput,
  SubDomainModel,
  UpdateDomainInput,
} from "../schema/masters/domain.schema";
import {
  IndustryInput,
  IndustryModel,
  UpdateIndustryInput,
} from "../schema/masters/industry.schema";
import {
  LocationInput,
  LocationModel,
  UpdateLocationInput,
} from "../schema/masters/location.schema";
import {
  QualificationInput,
  QualificationModel,
  UpdateQualificationInput,
} from "../schema/masters/qualification.schema";
import {
  SkillInput,
  SkillModel,
  UpdateSkillInput,
} from "../schema/masters/skills.schema";
import {
  SurveyInput,
  SurveyModel,
  SurveyType,
  UpdateSurveyInput,
} from "../schema/masters/survey.schema";
import { UserRole } from "../schema/user.schema";
import Context from "../types/context";

class MastersService {
  async addLocation(input: LocationInput) {
    try {
      return LocationModel.create(input);
    } catch (error) {
      console.log("Location Adding ERROR : " + error);
      throw new ApolloError("Error in adding location!");
    }
  }

  async updateLocation(input: UpdateLocationInput) {
    try {
      return await LocationModel.findByIdAndUpdate(
        input.id,
        { location: input.location, active: input.active },
        { new: true }
      );
    } catch (error) {
      console.log("Location Updating ERROR", error);
      throw new ApolloError("Error in updating location!");
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

  async updateQualification(input: UpdateQualificationInput) {
    try {
      return await QualificationModel.findByIdAndUpdate(
        input.id,
        { qualification: input.qualification, active: input.active },
        { new: true }
      );
    } catch (error) {
      console.log("Qualification Updating ERROR", error);
      throw new ApolloError("Error in updating qualification!");
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

  async updateIndustry(input: UpdateIndustryInput) {
    try {
      return await IndustryModel.findByIdAndUpdate(
        input.id,
        { industry: input.industry, active: input.active },
        { new: true }
      );
    } catch (error) {
      console.log("Industry Updating ERROR", error);
      throw new ApolloError("Error in updating industry!");
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

  async updateDomain(input: UpdateDomainInput) {
    try {
      return await DomainModel.findByIdAndUpdate(
        input.id,
        { domain: input.domain, active: input.active },
        { new: true }
      );
    } catch (error) {
      console.log("Domain Updating ERROR", error);
      throw new ApolloError("Error in updating domain!");
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

  async updateSkill(input: UpdateSkillInput) {
    try {
      return await SkillModel.findByIdAndUpdate(
        input.id,
        { skill: input.skill, active: input.active },
        { new: true }
      );
    } catch (error) {
      console.log("Skill Updating ERROR", error);
      throw new ApolloError("Error in updating skill!");
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

  async updateBenefit(input: UpdateBenefitInput) {
    try {
      return await BenefitModel.findByIdAndUpdate(
        input.id,
        { benefit: input.benefit, active: input.active },
        { new: true }
      );
    } catch (error) {
      console.log("Benefit Updating ERROR", error);
      throw new ApolloError("Error in updating benefit!");
    }
  }

  async allLocation(ctx: Context) {
    if (ctx.role === UserRole.employee || ctx.role === UserRole.employer) {
      return LocationModel.find({ active: true });
    } else {
      return LocationModel.find({});
    }
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

  async updateSurveyQuestion(input: UpdateSurveyInput) {
    try {
      return await SurveyModel.findByIdAndUpdate(
        input.id,
        {
          question: input.question,
          options: input.options,
          active: input.active,
        },
        { new: true }
      );
    } catch (error) {
      console.log("Benefit Updating SURVEY", error);
      throw new ApolloError("Error in updating survey!");
    }
  }

  async allBenefits() {
    return BenefitModel.find({});
  }
}

export default MastersService;
