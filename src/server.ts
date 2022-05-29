import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { resolvers } from "./resolvers";
import { connectToDb } from "./utils/db";
import { TokenType, verifyJwt } from "./utils/jwt";
import Context from "./types/context";

async function bootstrap() {
  const port = process.env.PORT || 4000;

  // Build the graphql schema
  const schema = await buildSchema({
    resolvers: resolvers,
  });

  const app = express();
  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;
      if (context.req.cookies.accessToken) {
        const user = verifyJwt<TokenType>(ctx.req.cookies.accessToken);
        context.user = user?.user;
        context.role = user?.role;
      }
      return context;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://inradius.in",
        "https://dev.inradius.in",
      ],
    },
  });

  app.listen({ port }, () => {
    console.info(`Graphql server started on port : ${port}`);
  });

  connectToDb();
}
bootstrap();
