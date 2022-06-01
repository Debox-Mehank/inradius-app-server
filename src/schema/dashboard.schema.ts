import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DashboardEmployee {
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  image: string;

  @Field(() => String, { nullable: false })
  location: string;

  @Field(() => String, { nullable: false })
  industry: string;

  @Field(() => String, { nullable: false })
  domain: string;
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
}
