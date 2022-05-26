import UserResolver from "./user.resolver";
import AdminResolver from "./admin.resolver";
import MastersResolver from "./masters.resolver";
import EmployeeResolver from "./employee.resolver";

export const resolvers = [UserResolver, AdminResolver, MastersResolver, EmployeeResolver] as const;