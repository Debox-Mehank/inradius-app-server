import { Arg, createUnionType, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Admin } from "../schema/admin.schema";
import { LoginInput, RegisterInput, User } from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";

const MeUnionType = createUnionType({
    name: "MeUnion", // the name of the GraphQL union
    types: () => [User, Admin] as const, // function that returns tuple of object types classes
    resolveType: value => {
        if ("name" in value) {
            return Admin; // we can return object type class (the one with `@ObjectType()`)
        }
        if ("firstName" in value) {
            return User; // or the schema name of the type as a string
        }
        return undefined;
    },
});

@Resolver()
export default class UserResolver {

    constructor(private userService: UserService) {
        this.userService = new UserService()
    }

    @Mutation(() => User)
    register(@Arg('input') input: RegisterInput) {
        return this.userService.createUser(input)
    }

    @Query(() => String)
    login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
        return this.userService.login(input, context)
    }

    @Query(() => MeUnionType)
    me(@Ctx() context: Context) {
        return context.user
    }
}