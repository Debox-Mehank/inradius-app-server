import UserResolver from "./user.resolver";
import AdminResolver from "./admin.resolver";
import MastersResolver from "./masters.resolver";
import EmployeeResolver from "./employee.resolver";
import EmployerResolver from "./employer.resolver";
import DashboardResolver from "./dashboard.resolver";
import InterestsResolver from "./interests.resolver";
import LoginContentResolver from "./login.content.resolver";
import RegisterContentResolver from "./register.content.resolver";
import RuleResolver from "./rule.resolver";

export const resolvers = [
  UserResolver,
  AdminResolver,
  MastersResolver,
  EmployeeResolver,
  EmployerResolver,
  DashboardResolver,
  InterestsResolver,
  LoginContentResolver,
  RegisterContentResolver,
  RuleResolver,
] as const;
