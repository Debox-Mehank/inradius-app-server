import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EmployeeModel } from "../schema/employee.schema";
import {
  EmployerModel,
  EmployerVerifyStatusEnum,
} from "../schema/employer.schema";
import {
  EmployerJobModel,
  EmployerJobStatusEnum,
} from "../schema/employer_jobs.schema";
import {
  EmailVerifyInput,
  LoginInput,
  RegisterInput,
  UpdateUserStatusInput,
  UserModel,
  UserRole,
  UserStatus,
} from "../schema/user.schema";
import Context from "../types/context";
import { getUserByEmail, getUserById, getUserByNumber } from "../utils/helper";
import {
  signJwt,
  VerificationTokenType,
  verifyJwt,
  jwtValid,
} from "../utils/jwt";
import { sendUserVerificationEmail } from "../utils/mailer";

class UserService {
  async createUser(input: RegisterInput) {
    // Call user model to create user
    try {
      const checkUserEmail = await getUserByEmail(input.email);

      if (checkUserEmail) {
        throw new ApolloError("User with email already exist!");
      }

      const checkUserNumber = await getUserByNumber(input.number);

      if (checkUserNumber) {
        throw new ApolloError("User with phone number already exist!");
      }

      const user = await UserModel.create(input);
      // Send verification email
      await sendUserVerificationEmail({
        email: input.email,
        name: input.firstName + input.lastName,
        userId: user._id,
      });
      return user;
    } catch (error) {
      console.log("ERROR CREATE_USER : " + error);
      throw new ApolloError(error as string);
    }
  }

  async login(input: LoginInput, context: Context) {
    // get user
    const user = await getUserByEmail(input.email);

    if (!user) {
      throw new ApolloError("Invalid email or password!");
    }

    if (!user.isAccountVerified) {
      throw new ApolloError("Verify your email id to continue!");
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new ApolloError("Invalid email or password!");
    }

    // create jwt
    const token = signJwt({ role: user.type, user: user._id });

    // create cookie
    if (process.env.NODE_ENV === "production") {
      context.res.cookie("accessToken", token, {
        maxAge: 3.154e10,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "fierce-crag-46127.herokuapp.com",
        path: "/",
      });
    } else {
      context.res.cookie("accessToken", token, {
        maxAge: 3.154e10,
        httpOnly: true,
      });
    }

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { lastLoggedIn: new Date() } },
      { new: true }
    );

    return true;
  }

  async logout(context: Context) {
    if (process.env.NODE_ENV === "production") {
      context.res.cookie("accessToken", "", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "fierce-crag-46127.herokuapp.com",
        path: "/",
        expires: new Date(0),
      });
    } else {
      context.res.cookie("accessToken", "", {
        maxAge: 3.154e10,
        httpOnly: true,
        expires: new Date(0),
      });
    }

    await UserModel.findOneAndUpdate(
      { _id: context.user },
      { $set: { lastLoggedOut: new Date() } },
      { new: true }
    );

    return true;
  }

  async verifyEmail(input: EmailVerifyInput) {
    const payload = verifyJwt<VerificationTokenType>(input.token);

    if (!payload) {
      throw new ApolloError("Verification link expired!");
    }

    const user = await getUserById(payload.id);

    if (!user) {
      throw new ApolloError("Something went wrong!");
    }

    if (user.isAccountVerified) {
      throw new ApolloError("Account already verified!");
    }

    try {
      if (user.type === UserRole.employee) {
        await EmployeeModel.create({ user: user._id });
      } else if (user.type === UserRole.employer) {
        // const job = await EmployerJobModel.create({
        //   user: user._id,
        //   jobStatus: EmployerJobStatusEnum.Open,
        // });
        await EmployerModel.create({
          user: user._id,
          // jobs: [job._id],
          employerVerifyStatus: EmployerVerifyStatusEnum.DocumentsPending,
        });
      } else {
        throw new ApolloError("Something went wrong!");
      }

      await UserModel.updateOne(
        { _id: payload.id },
        { $set: { isAccountVerified: true } }
      );

      return true;
    } catch (error) {
      throw new ApolloError("Something went wrong!");
    }
  }

  async resendVerifyEmail(input: EmailVerifyInput) {
    const isJwtValid: boolean = jwtValid(input.token);
    if (isJwtValid) {
      const user = await getUserById(input.id);
      if (!user) {
        throw new ApolloError("Something went wrong!");
      }

      try {
        await sendUserVerificationEmail({
          email: user.email,
          name: user.firstName + " " + user.lastName,
          userId: user._id,
        });
      } catch (error) {
        console.log(error);
        throw new ApolloError("Something went wrong!");
      }
    }
    return false;
  }

  async updateSurveyStatus(context: Context) {
    try {
      await UserModel.updateOne(
        { _id: context?.user ?? "" },
        { $set: { isSurveyCompleted: true } }
      );
      return true;
    } catch (error) {
      console.log("Error In Updating Survey Status : " + error);
      return false;
    }
  }

  async updateUserImage(image: String, context: Context) {
    try {
      await UserModel.updateOne(
        { _id: context?.user ?? "" },
        { $set: { image: image } }
      );
      return true;
    } catch (error) {
      console.log("Error In Updating User Image : " + error);
      return false;
    }
  }

  async updateProfileStatus(context: Context) {
    try {
      await UserModel.updateOne(
        { _id: context?.user ?? "" },
        { $set: { isProfileCompleted: true } }
      );
      return true;
    } catch (error) {
      console.log("Error In Updating Profile Status : " + error);
      return false;
    }
  }

  async updateUserStatus(input: UpdateUserStatusInput) {
    try {
      await UserModel.updateOne(
        { _id: input.id},
        { $set: { userStatus: input.userStatus} }
      );
      return true;
    } catch (error) {
      console.log("Error In Updating User Status : " + error);
      return false;
    }
  }
}

export default UserService;
