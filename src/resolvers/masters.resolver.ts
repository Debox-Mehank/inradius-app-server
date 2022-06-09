import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  Benefit,
  BenefitInput,
  UpdateBenefitInput,
} from "../schema/masters/benefit.schema";
import {
  Domain,
  DomainInput,
  SubDomain,
  SubDomainInput,
  UpdateDomainInput,
} from "../schema/masters/domain.schema";
import {
  Industry,
  IndustryInput,
  UpdateIndustryInput,
} from "../schema/masters/industry.schema";
import {
  Location,
  LocationInput,
  UpdateLocationInput,
} from "../schema/masters/location.schema";
import {
  Qualification,
  QualificationInput,
  UpdateQualificationInput,
} from "../schema/masters/qualification.schema";
import {
  Skill,
  SkillInput,
  UpdateSkillInput,
} from "../schema/masters/skills.schema";
import {
  Survey,
  SurveyInput,
  SurveyType,
  UpdateSurveyInput,
} from "../schema/masters/survey.schema";
import MastersService from "../service/masters.service";
import Context from "../types/context";
import { isAdmin, isAuth } from "../utils/permissions";

@Resolver()
export default class MastersResolver {
  constructor(private service: MastersService) {
    this.service = new MastersService();
  }

  @Mutation(() => Location)
  @UseMiddleware([isAuth, isAdmin])
  addLocation(@Arg("input") input: LocationInput) {
    return this.service.addLocation(input);
  }

  @Mutation(() => Location)
  @UseMiddleware([isAuth, isAdmin])
  updateLocation(@Arg("input") input: UpdateLocationInput) {
    return this.service.updateLocation(input);
  }

  @Mutation(() => Industry)
  @UseMiddleware([isAuth, isAdmin])
  updateIndustry(@Arg("input") input: UpdateIndustryInput) {
    return this.service.updateIndustry(input);
  }

  @Mutation(() => Domain)
  @UseMiddleware([isAuth, isAdmin])
  updateDomain(@Arg("input") input: UpdateDomainInput) {
    return this.service.updateDomain(input);
  }

  @Mutation(() => Benefit)
  @UseMiddleware([isAuth, isAdmin])
  updateBenefit(@Arg("input") input: UpdateBenefitInput) {
    return this.service.updateBenefit(input);
  }

  @Mutation(() => Qualification)
  @UseMiddleware([isAuth, isAdmin])
  updateQualification(@Arg("input") input: UpdateQualificationInput) {
    return this.service.updateQualification(input);
  }

  @Mutation(() => Skill)
  @UseMiddleware([isAuth, isAdmin])
  updateSkill(@Arg("input") input: UpdateSkillInput) {
    return this.service.updateSkill(input);
  }

  @Mutation(() => Qualification)
  @UseMiddleware([isAuth, isAdmin])
  addQualification(@Arg("input") input: QualificationInput) {
    return this.service.addQualification(input);
  }

  @Mutation(() => Industry)
  @UseMiddleware([isAuth, isAdmin])
  addIndustry(@Arg("input") input: IndustryInput) {
    return this.service.addIndustry(input);
  }

  @Mutation(() => Domain)
  @UseMiddleware([isAuth, isAdmin])
  addDomain(@Arg("input") input: DomainInput) {
    return this.service.addDomain(input);
  }

  @Mutation(() => SubDomain)
  @UseMiddleware([isAuth, isAdmin])
  addSubDomain(@Arg("input") input: SubDomainInput) {
    return this.service.addSubDomain(input);
  }

  @Mutation(() => Skill)
  @UseMiddleware([isAuth, isAdmin])
  addSkill(@Arg("input") input: SkillInput) {
    return this.service.addSkill(input);
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  addSkills(@Arg("input", () => [SkillInput]) input: [SkillInput]) {
    return this.service.addSkills(input);
  }

  @Mutation(() => Survey)
  @UseMiddleware([isAuth, isAdmin])
  addSurvey(@Arg("input") input: SurveyInput) {
    return this.service.addSurvey(input);
  }

  @Mutation(() => Benefit)
  @UseMiddleware([isAuth, isAdmin])
  addBenefit(@Arg("input") input: BenefitInput) {
    return this.service.addBenefit(input);
  }

  @Query(() => [Location])
  @UseMiddleware([isAuth])
  allLocations(@Ctx() context: Context) {
    return this.service.allLocation(context);
  }

  @Query(() => [Qualification])
  @UseMiddleware([isAuth])
  allQualifications() {
    return this.service.allQualifications();
  }

  @Query(() => [Industry])
  @UseMiddleware([isAuth])
  allIndustries() {
    return this.service.allIndustries();
  }

  @Query(() => [Domain])
  @UseMiddleware([isAuth])
  allDomains() {
    return this.service.allDomains();
  }

  @Query(() => [SubDomain])
  @UseMiddleware([isAuth])
  allSubDomains() {
    return this.service.allSubDomains();
  }

  @Query(() => [Skill])
  @UseMiddleware([isAuth])
  allSkills() {
    return this.service.allSkills();
  }

  @Query(() => [Survey])
  @UseMiddleware([isAuth])
  allSurveyQuestion(
    @Arg("type", () => SurveyType, { nullable: true }) type: SurveyType
  ) {
    return this.service.allSurveyQuestion(type);
  }

  @Mutation(() => Survey)
  @UseMiddleware([isAuth, isAdmin])
  updateSurveyQuestion(@Arg("input") input: UpdateSurveyInput) {
    return this.service.updateSurveyQuestion(input);
  }

  @Query(() => [Benefit])
  @UseMiddleware([isAuth])
  allBenefits() {
    return this.service.allBenefits();
  }
}
