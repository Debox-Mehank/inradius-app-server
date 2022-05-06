import mongoose from "mongoose";
import config from "config"

export async function connectToDb() {
    try {
        await mongoose.connect(config.get("dbUri"))
        console.log("Connected To Database!")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
