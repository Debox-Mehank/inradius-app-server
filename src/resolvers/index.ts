import UserResolver from "./user.resolver";
import AdminResolver from "./admin.resolver";
import LocationResolver from "./location.resolver";
import RegisterEmployeeResolver from "./register.employee.resolver";

export const resolvers = [UserResolver, AdminResolver, LocationResolver, RegisterEmployeeResolver] as const;