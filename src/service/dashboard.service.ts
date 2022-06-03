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

const BASE_SCORE = 70;
const SKILLS_SCORE = 10;
const SUBDOMAIN_SCORE = 30;
const EXPERIENCE_SCORE = 30;

const BASE_WEIGHTAGE = 0.5;
const MATCH_WEIGHTAGE = 0.5;

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

    // isPointWithinRadius(
    //   {
    //     latitude: employee.latitude,
    //     longitude: employee.longitude,
    //   },
    //   {
    //     latitude: job.latitude,
    //     longitude: job.longitude,
    //   },
    //   job.radius
    // );

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
                  isDocument(job.subDomain) &&
                  isDocumentArray(job.skills) &&
                  isDocument(employee.location) &&
                  isDocument(employee.industry) &&
                  isDocument(employee.domain) &&
                  isDocument(employee.subDomain) &&
                  isDocumentArray(employee.skills)
                ) {
                  console.log(
                    isPointWithinRadius(
                      { latitude: job.latitude, longitude: job.longitude },
                      {
                        latitude: employee.latitude,
                        longitude: employee.longitude,
                      },
                      employee.radius * 1000
                    )
                  );
                  if (
                    job.location._id.toString() ===
                      employee.location._id.toString() &&
                    job.industry._id.toString() ===
                      employee.industry._id.toString() &&
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
                    employee.expectedPay >= job.minPay &&
                    employee.expectedPay <= job.maxPay
                  ) {
                    const skillsMatched = _.intersection(
                      job.skills.slice(0, 4).map((el) => el._id.toString()),
                      employee.skills.slice(0, 4).map((el) => el._id.toString())
                    ).length;

                    const subDomainMatch =
                      job.subDomain._id.toString() ===
                      employee.subDomain._id.toString();

                    const employeeRelevantExp = employee.fresher
                      ? 0
                      : parseInt(employee.relevantExp.years) * 12 +
                        parseInt(employee.relevantExp.months);
                    const jobMinReqExp =
                      parseInt(job.minRequiredExp.years) * 12 +
                      parseInt(job.minRequiredExp.months);

                    var postMatchScore = 0;

                    if (skillsMatched > 0) {
                      postMatchScore += SKILLS_SCORE * skillsMatched;
                    }

                    if (subDomainMatch) {
                      postMatchScore += SUBDOMAIN_SCORE;
                    }

                    if (jobMinReqExp <= employeeRelevantExp) {
                      postMatchScore += EXPERIENCE_SCORE;
                    }

                    const finalScore =
                      BASE_SCORE * BASE_WEIGHTAGE +
                      postMatchScore * MATCH_WEIGHTAGE;

                    employeeExploreArr.push({
                      companyName: employer.companyName,
                      companyImage: employer.companyImage,
                      domain: job.domain.domain,
                      industry: job.industry.industry,
                      jobDesc: job.jobDesc,
                      jobTitle: job.jobTitle,
                      jobType: job.jobType,
                      location: job.location.location,
                      score: finalScore,
                      employerId: employer._id,
                      jobId: job._id,
                      userId: employer.user._id,
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
                  isDocument(job.subDomain) &&
                  isDocumentArray(job.skills) &&
                  isDocument(employee.location) &&
                  isDocument(employee.industry) &&
                  isDocument(employee.domain) &&
                  isDocument(employee.subDomain) &&
                  isDocumentArray(employee.skills)
                ) {
                  //   console.log(
                  //     `Employee Lat : ${employee.latitude} Employee Lng : ${employee.longitude} Employee Name: ${employee.user.firstName}`
                  //   );
                  if (
                    job.location._id.toString() ===
                      employee.location._id.toString() &&
                    job.industry._id.toString() ===
                      employee.industry._id.toString() &&
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
                    employee.expectedPay >= job.minPay &&
                    employee.expectedPay <= job.maxPay
                  ) {
                    const skillsMatched = _.intersection(
                      job.skills.slice(0, 4).map((el) => el._id.toString()),
                      employee.skills.slice(0, 4).map((el) => el._id.toString())
                    ).length;

                    const subDomainMatch =
                      job.subDomain._id.toString() ===
                      employee.subDomain._id.toString();

                    const employeeRelevantExp = employee.fresher
                      ? 0
                      : parseInt(employee.relevantExp.years) * 12 +
                        parseInt(employee.relevantExp.months);
                    const jobMinReqExp =
                      parseInt(job.minRequiredExp.years) * 12 +
                      parseInt(job.minRequiredExp.months);

                    var postMatchScore = 0;

                    if (skillsMatched > 0) {
                      postMatchScore += SKILLS_SCORE * skillsMatched;
                    }

                    if (subDomainMatch) {
                      postMatchScore += SUBDOMAIN_SCORE;
                    }

                    if (jobMinReqExp <= employeeRelevantExp) {
                      postMatchScore += EXPERIENCE_SCORE;
                    }

                    const finalScore =
                      BASE_SCORE * BASE_WEIGHTAGE +
                      postMatchScore * MATCH_WEIGHTAGE;

                    employerExploreArr.push({
                      firstName: employee.user.firstName,
                      lastName: employee.user.lastName,
                      image: employee.user.image,
                      domain: employee.domain.domain,
                      industry: employee.industry.industry,
                      location: employee.location.location,
                      score: finalScore,
                      employeeId: employee._id,
                      userId: employee.user._id,
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
}

export default DashboardService;
