import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Location, LocationInput } from "../schema/location.schema";
import LocationService from "../service/location.service";
import { isAdmin, isAuth } from "../utils/permissions";

@Resolver()
export default class LocationResolver {

    constructor(private service: LocationService) {
        this.service = new LocationService()
    }

    @Mutation(() => Location)
    @UseMiddleware([isAuth, isAdmin])
    addLocation(@Arg('input') input: LocationInput) {
        return this.service.addLocation(input)
    }
}