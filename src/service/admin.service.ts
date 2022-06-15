import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";
import {
  AdminRegisterInput,
  AdminLoginInput,
  Admin,
  AdminModel,
} from "../schema/admin.schema";
import { EmployeeModel } from "../schema/employee.schema";
import { EmployerModel } from "../schema/employer.schema";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";

class AdminService {
  async createAdmin(input: AdminRegisterInput) {
    // Call user model to create user
    return AdminModel.create(input);
  }

  private async getAdminByEmail(email: string): Promise<Admin | null> {
    const user = await AdminModel.findOne({ email: email });
    return user;
  }

  async loginAdmin(input: AdminLoginInput, context: Context) {
    // get user
    const user = await this.getAdminByEmail(input.email);

    if (!user) {
      throw new ApolloError("Invalid email or password!");
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

    return token;
  }

  logoutAdmin(context: Context) {
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

    return true;
  }

  async getAllEmployees() {
    try {
      return await EmployeeModel.find({});
    } catch (error) {
      throw new ApolloError("Error in getting all employees!");
    }
  }

  async getAllEmployers() {
    try {
      return await EmployerModel.find({});
    } catch (error) {
      throw new ApolloError("Error in getting all employers!");
    }
  }
}

export default AdminService;
