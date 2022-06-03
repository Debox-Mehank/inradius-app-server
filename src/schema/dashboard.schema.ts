import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class DashboardEmployee {
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => String, { nullable: false })
  location: string;

  @Field(() => String, { nullable: false })
  industry: string;

  @Field(() => String, { nullable: false })
  domain: string;

  @Field(() => Number, { nullable: false })
  score: number;

  @Field(() => ID, { nullable: false })
  employeeId: string;

  @Field(() => ID, { nullable: false })
  userId: string;
}

@ObjectType()
export class DashboardEmployer {
  @Field(() => String, { nullable: false })
  companyName: string;

  @Field(() => String, { nullable: false })
  companyImage: string;

  @Field(() => String, { nullable: false })
  jobTitle: string;

  @Field(() => String, { nullable: false })
  jobDesc: string;

  @Field(() => String, { nullable: false })
  jobType: string;

  @Field(() => String, { nullable: false })
  location: string;

  @Field(() => String, { nullable: false })
  industry: string;

  @Field(() => String, { nullable: false })
  domain: string;

  @Field(() => Number, { nullable: false })
  score: number;

  @Field(() => ID, { nullable: false })
  employerId: string;

  @Field(() => ID, { nullable: false })
  userId: string;

  @Field(() => ID, { nullable: false })
  jobId: string;
}
