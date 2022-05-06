import UserResolver from "./user.resolver";
import AdminResolver from "./admin.resolver";

export const resolvers = [UserResolver, AdminResolver] as const;