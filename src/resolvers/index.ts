import UserResolver from "./user.resolver";
import AdminResolver from "./admin.resolver";
import MastersResolver from "./masters.resolver";
import EmployeeResolver from "./employee.resolver";
import EmployerResolver from "./employer.resolver";

export const resolvers = [
  UserResolver,
  AdminResolver,
  MastersResolver,
  EmployeeResolver,
  EmployerResolver,
] as const;
