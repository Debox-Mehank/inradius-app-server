import { Request, Response } from "express"
import { Admin } from "../schema/admin.schema";
import { User } from "../schema/user.schema";

interface Context {
    req: Request,
    res: Response,
    user: string | undefined
    role: Admin['type'] | User['type'] | undefined
}

export default Context