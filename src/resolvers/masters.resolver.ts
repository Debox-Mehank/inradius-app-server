import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Domain, DomainInput, DomainModel, SubDomain, SubDomainInput, SubDomainModel } from "../schema/masters/domain.schema";
import { Industry, IndustryInput, IndustryModel } from "../schema/masters/industry.schema";
import { Location, LocationInput, LocationModel } from "../schema/masters/location.schema";
import { Qualification, QualificationInput } from "../schema/masters/qualification.schema";
import { Skill, SkillInput, SkillModel } from "../schema/masters/skills.schema";
import { Survey, SurveyInput, SurveyType } from "../schema/masters/survey.schema";
import MastersService from "../service/masters.service";
import { isAdmin, isAuth } from "../utils/permissions";


@Resolver()
export default class MastersResolver {

    constructor(private service: MastersService) {
        this.service = new MastersService()
    }

    @Mutation(() => Location)
    @UseMiddleware([isAuth, isAdmin])
    addLocation(@Arg('input') input: LocationInput) {
        return this.service.addLocation(input)
    }

    @Mutation(() => Qualification)
    @UseMiddleware([isAuth, isAdmin])
    addQualification(@Arg('input') input: QualificationInput) {
        return this.service.addQualification(input)
    }

    @Mutation(() => Industry)
    @UseMiddleware([isAuth, isAdmin])
    addIndustry(@Arg('input') input: IndustryInput) {
        return this.service.addIndustry(input)
    }

    @Mutation(() => Domain)
    @UseMiddleware([isAuth, isAdmin])
    addDomain(@Arg('input') input: DomainInput) {
        return this.service.addDomain(input)
    }

    @Mutation(() => SubDomain)
    @UseMiddleware([isAuth, isAdmin])
    addSubDomain(@Arg('input') input: SubDomainInput) {
        return this.service.addSubDomain(input)
    }

    @Mutation(() => Skill)
    @UseMiddleware([isAuth, isAdmin])
    addSkill(@Arg('input') input: SkillInput) {
        return this.service.addSkill(input)
    }

    @Mutation(() => Survey)
    @UseMiddleware([isAuth, isAdmin])
    addSurvey(@Arg('input') input: SurveyInput) {
        return this.service.addSurvey(input)
    }

    @Query(() => [Location])
    @UseMiddleware([isAuth])
    allLocations() {
        return this.service.allLocation()
    }

    @Query(() => [Qualification])
    @UseMiddleware([isAuth])
    allQualifications() {
        return this.service.allQualifications()
    }

    @Query(() => [Industry])
    @UseMiddleware([isAuth])
    allIndustries() {
        return this.service.allIndustries()
    }

    @Query(() => [Domain])
    @UseMiddleware([isAuth])
    allDomains() {
        return this.service.allDomains()
    }

    @Query(() => [SubDomain])
    @UseMiddleware([isAuth])
    allSubDomains() {
        return this.service.allSubDomains()
    }

    @Query(() => [Skill])
    @UseMiddleware([isAuth])
    allSkills() {
        return this.service.allSkills()
    }

    @Query(() => [Survey])
    @UseMiddleware([isAuth])
    allSurveyQuestion(@Arg("type", () => SurveyType, { nullable: true }) type: SurveyType,) {
        return this.service.allSurveyQuestion(type)
    }
}