import dotenv from "dotenv"
dotenv.config();
import "reflect-metadata"
import express from "express"
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
import { resolvers } from "./resolvers";

async function bootstrap() {
    const port = process.env.PORT || 4000

    // Build the graphql schema
    const schema = await buildSchema({
        resolvers: resolvers,
        // authChecker: 
    })

    const app = express()
    app.use(cookieParser())

    const server = new ApolloServer({
        schema,
        context: (ctx) => ctx,
        plugins: [
            process.env.NODE_ENV === "production" ?
                ApolloServerPluginLandingPageProductionDefault() :
                ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    })

    await server.start()

    server.applyMiddleware({ app })

    app.listen({ port }, () => {
        console.info(`Graphql server started on : http://localhost:${port}`)
    })
}
bootstrap()