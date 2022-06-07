import { ApolloError } from "apollo-server";
import {
  DashboardEmployee,
  DashboardEmployer,
} from "../schema/dashboard.schema";
import { EmployeeModel } from "../schema/employee.schema";
import { EmployerModel } from "../schema/employer.schema";
import {
  EmployerJobModel,
  EmployerJobStatusEnum,
} from "../schema/employer_jobs.schema";
import { isPointWithinRadius } from "geolib";
import _ from "lodash";
import Context from "../types/context";
import { isDocument, isDocumentArray } from "@typegoose/typegoose";

const TOTAL_SKILLS = 4;
const TOTAL_SUBDOMAINS = 3;

const SKILLS_WEIGHTAGE = 0.4;
const SUBDOMAINS_WEIGHTAGE = 0.3;
const PAY_WEIGHTAGE = 0.2;
const EXPERIENCE_WEIGHTAGE = 0.1;

// Logics Are implemented here
class DashboardService {
  async employeeExplore(context: Context): Promise<DashboardEmployer[]> {
    var employeeExploreArr: DashboardEmployer[] = [];
    const employee = await EmployeeModel.findOne({ user: context.user });

    if (!employee) {
      return [];
    }

    const allEmployers = await EmployerModel.find({
      employerVerified: true,
    });

    // Matching Part
    for (let index = 0; index < allEmployers.length; index++) {
      const employer = allEmployers[index];
      if (isDocument(employer.user)) {
        if (
          employer.user.isAccountVerified &&
          employer.user.isProfileCompleted &&
          employer.user.isSurveyCompleted
        ) {
          for (let jobIndex = 0; jobIndex < employer.jobs.length; jobIndex++) {
            const job = employer.jobs[jobIndex];
            if (isDocument(job)) {
              if (
                job.listingComplete &&
                job.jobStatus === EmployerJobStatusEnum.Open
              ) {
                if (
                  isDocument(job.location) &&
                  isDocument(job.industry) &&
                  isDocument(job.domain) &&
                  isDocumentArray(job.subDomain) &&
                  isDocumentArray(job.skills) &&
                  isDocument(employee.location) &&
                  isDocument(employee.industry) &&
                  isDocument(employee.domain) &&
                  isDocumentArray(employee.subDomain) &&
                  isDocumentArray(employee.skills)
                ) {
                  if (
                    job.location._id.toString() ===
                      employee.location._id.toString() &&
                    job.domain._id.toString() ===
                      employee.domain._id.toString() &&
                    isPointWithinRadius(
                      { latitude: job.latitude, longitude: job.longitude },
                      {
                        latitude: employee.latitude,
                        longitude: employee.longitude,
                      },
                      employee.radius * 1000
                    ) &&
                    ((employee.expectedPay >= job.minPay &&
                      employee.expectedPay <= job.maxPay) ||
                      employee.expectedPay < job.minPay)
                  ) {
                    var defaultScore = 0;

                    const skillsMatched = _.intersection(
                      job.skills.map((el) => el._id.toString()),
                      employee.skills.map((el) => el._id.toString())
                    ).length;

                    const skillsValue =
                      (skillsMatched / TOTAL_SKILLS) * SKILLS_WEIGHTAGE * 100;

                    const subDomainsMatched = _.intersection(
                      job.subDomain.map((el) => el._id.toString()),
                      employee.subDomain.map((el) => el._id.toString())
                    ).length;

                    const subDomainsValue =
                      (subDomainsMatched / TOTAL_SUBDOMAINS) *
                      SUBDOMAINS_WEIGHTAGE *
                      100;

                    const employeeRelevantExp = employee.fresher
                      ? 0
                      : parseInt(employee.relevantExp.years) * 12 +
                        parseInt(employee.relevantExp.months);

                    const jobMinReqExp =
                      parseInt(job.minRequiredExp.years) * 12 +
                      parseInt(job.minRequiredExp.months);

                    if (jobMinReqExp <= employeeRelevantExp) {
                      defaultScore += EXPERIENCE_WEIGHTAGE * 100;
                    }

                    const newPayWeightage = PAY_WEIGHTAGE / TOTAL_SKILLS;

                    const payValue =
                      (employee.expectedPay / (job.minPay + job.maxPay)) *
                      100 *
                      newPayWeightage *
                      skillsMatched;

                    defaultScore += skillsValue + subDomainsValue + payValue;

                    employeeExploreArr.push({
                      employerId: employer,
                      jobId: job,
                      userId: employer.user,
                      score: parseFloat(defaultScore.toFixed(2)),
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    return employeeExploreArr;
  }

  async employerExplore(
    jobId: String,
    context: Context
  ): Promise<DashboardEmployee[]> {
    var employerExploreArr: DashboardEmployee[] = [];
    const employer = await EmployerModel.findOne({ user: context.user });

    if (!employer) {
      return [];
    }

    if (!isDocumentArray(employer.jobs)) {
      return [];
    }

    const filterJobById = employer.jobs.filter(
      (el) => el._id.toString() === jobId
    );
    const job = filterJobById.length > 0 ? filterJobById[0] : null;

    if (!job) {
      return [];
    }

    const allEmployees = await EmployeeModel.find({});

    try {
      // Matching Part
      for (let index = 0; index < allEmployees.length; index++) {
        const employee = allEmployees[index];
        if (isDocument(employee.user)) {
          if (
            employee.user.isAccountVerified &&
            employee.user.isProfileCompleted &&
            employee.user.isSurveyCompleted
          ) {
            if (isDocument(job)) {
              if (
                job.listingComplete &&
                job.jobStatus === EmployerJobStatusEnum.Open
              ) {
                if (
                  isDocument(job.location) &&
                  isDocument(job.industry) &&
                  isDocument(job.domain) &&
                  isDocumentArray(job.subDomain) &&
                  isDocumentArray(job.skills) &&
                  isDocument(employee.location) &&
                  isDocument(employee.industry) &&
                  isDocument(employee.domain) &&
                  isDocumentArray(employee.subDomain) &&
                  isDocumentArray(employee.skills)
                ) {
                  if (
                    job.location._id.toString() ===
                      employee.location._id.toString() &&
                    job.domain._id.toString() ===
                      employee.domain._id.toString() &&
                    isPointWithinRadius(
                      {
                        latitude: employee.latitude ?? 0,
                        longitude: employee.longitude ?? 0,
                      },
                      {
                        latitude: job.latitude ?? 0,
                        longitude: job.longitude ?? 0,
                      },
                      job.radius * 1000
                    ) &&
                    ((employee.expectedPay >= job.minPay &&
                      employee.expectedPay <= job.maxPay) ||
                      employee.expectedPay < job.minPay)
                  ) {
                    var defaultScore = 0;

                    const skillsMatched = _.intersection(
                      job.skills.map((el) => el._id.toString()),
                      employee.skills.map((el) => el._id.toString())
                    ).length;

                    const skillsValue =
                      (skillsMatched / TOTAL_SKILLS) * SKILLS_WEIGHTAGE * 100;

                    const subDomainsMatched = _.intersection(
                      job.subDomain.map((el) => el._id.toString()),
                      employee.subDomain.map((el) => el._id.toString())
                    ).length;

                    const subDomainsValue =
                      (subDomainsMatched / TOTAL_SUBDOMAINS) *
                      SUBDOMAINS_WEIGHTAGE *
                      100;

                    const employeeRelevantExp = employee.fresher
                      ? 0
                      : parseInt(employee.relevantExp.years) * 12 +
                        parseInt(employee.relevantExp.months);

                    const jobMinReqExp =
                      parseInt(job.minRequiredExp.years) * 12 +
                      parseInt(job.minRequiredExp.months);

                    if (jobMinReqExp <= employeeRelevantExp) {
                      defaultScore += EXPERIENCE_WEIGHTAGE * 100;
                    }

                    const newPayWeightage = PAY_WEIGHTAGE / TOTAL_SKILLS;

                    const payValue =
                      (employee.expectedPay / (job.minPay + job.maxPay)) *
                      100 *
                      newPayWeightage *
                      skillsMatched;

                    defaultScore += skillsValue + subDomainsValue + payValue;

                    employerExploreArr.push({
                      score: parseFloat(defaultScore.toFixed(2)),
                      employeeId: employee,
                      userId: employee.user,
                    });
                  }
                }
              }
            }
          }
        }
      }

      return employerExploreArr;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async interestJob(jobId: String, ctx: Context): Promise<Boolean> {
    return true;
  }
}

export default DashboardService;
