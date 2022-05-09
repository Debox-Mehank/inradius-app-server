import { ApolloError } from "apollo-server";
import { LocationInput, LocationModel } from "../schema/location.schema";

class LocationService {
    async addLocation(input: LocationInput) {
        // Call user model to create user
        return LocationModel.create(input)
    }
}

export default LocationService