import {
  ApolloServerPluginDrainHttpServer,
  ContextFunction,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { Express } from 'express';
import { GraphQLSchema } from 'graphql';
import { Server } from 'http';

export default (
  app: Express,
  httpServer: Server,
  // typeDefs: string | DocumentNode | DocumentNode[] | string[] | undefined,
  // resolvers: any
  schema: GraphQLSchema,
  context?: object | ContextFunction<ExpressContext, object> | undefined
) => {
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context,
  });

  return server;
};
