import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt"
import { EmailVerifyInput, LoginInput, RegisterInput, User, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import { getUserByEmail, getUserById } from "../utils/helper";
import { signJwt, VerificationTokenType, verifyJwt } from "../utils/jwt";
import { sendUserVerificationEmail } from "../utils/mailer";

class UserService {
    async createUser(input: RegisterInput) {
        // Call user model to create user
        const user = await UserModel.create(input)

        // Send verification email
        await sendUserVerificationEmail({ email: input.email, name: input.firstName + input.lastName, userId: user._id })

        return user
    }

    async login(input: LoginInput, context: Context) {
        // get user
        const user = await getUserByEmail(input.email)

        if (!user) {
            throw new ApolloError("Invalid email or password!")
        }

        if (!user.isAccountVerified) {
            throw new ApolloError("Verify your email id to continue!")
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(input.password, user.password)

        if (!isPasswordValid) {
            throw new ApolloError("Invalid email or password!")
        }

        // create jwt
        const token = signJwt({ role: user.type, user: user._id })

        // create cookie
        context.res.cookie("accessToken", token, { maxAge: 3.154e10, httpOnly: true, domain: "localhost", path: "/", sameSite: "strict", secure: process.env.NODE_ENV === "production" })

        return token
    }

    async verifyEmail(input: EmailVerifyInput, context: Context) {
        const payload = verifyJwt<VerificationTokenType>(input.token)
        if (payload) {
            await UserModel.updateOne({ email: payload.email }, { $set: { isAccountVerified: true } })
            return true
        }
        return false
    }

    async updateSurveyStatus(context: Context) {
        try {
            await UserModel.updateOne({ _id: context?.user ?? "" }, { $set: { isSurveyCompleted: true } })
            return true
        } catch (error) {
            console.log("Error In Updating Survey Status : " + error)
            return false
        }
    }

    async updateProfileStatus(context: Context) {
        try {
            await UserModel.updateOne({ _id: context?.user ?? "" }, { $set: { isProfileCompleted: true } })
            return true
        } catch (error) {
            console.log("Error In Updating Profile Status : " + error)
            return false
        }
    }
}

export default UserService