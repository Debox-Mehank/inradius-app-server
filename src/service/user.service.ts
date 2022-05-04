import { UserModel } from "../schema/user.schema";

class UserService {
    async createUser(input: any) {
        // Call user model to create user
        return UserModel.create(input)
    }
}

export default UserService