import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt"
import { LoginInput, RegisterInput, User, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import { getUserByEmail } from "../utils/helper";
import { signJwt } from "../utils/jwt";
import { sendUserVerificationEmail } from "../utils/mailer";

class UserService {
    async createUser(input: RegisterInput) {
        // Call user model to create user
        const user = UserModel.create(input)

        // Send verification email
        const sendEmail = await sendUserVerificationEmail()

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
}

export default UserService