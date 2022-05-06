import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt"
import { AdminRegisterInput, AdminLoginInput, Admin, AdminModel } from "../schema/admin.schema";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";

class AdminService {
    async createAdmin(input: AdminRegisterInput) {
        // Call user model to create user
        return AdminModel.create(input)
    }

    private async getAdminByEmail(email: string): Promise<Admin | null> {
        const user = await AdminModel.findOne({ email: email })
        return user
    }

    async loginAdmin(input: AdminLoginInput, context: Context) {
        // get user
        const user = await this.getAdminByEmail(input.email)

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

export default AdminService