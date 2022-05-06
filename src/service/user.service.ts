import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt"
import { LoginInput, RegisterInput, User, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";

class UserService {
    async createUser(input: RegisterInput) {
        // Call user model to create user
        return UserModel.create(input)
    }

    private async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email: email })
        return user
    }

    async login(input: LoginInput, context: Context) {
        // get user
        const user = await this.getUserByEmail(input.email)

        if (!user) {
            throw new ApolloError("Invalid email or password!")
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(input.password, user.password)

        if (!isPasswordValid) {
            throw new ApolloError("Invalid email or password!")
        }

        // create jwt
        const token = signJwt({ role: user.type, user: user })

        // create cookie
        context.res.cookie("accessToken", token, { maxAge: 3.154e10, httpOnly: true, domain: "localhost", path: "/", sameSite: "strict", secure: process.env.NODE_ENV === "production" })

        return token
    }
}

export default UserService