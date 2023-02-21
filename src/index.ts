import app from './Server';
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URI } from './config/db';
import http from 'http';
import apolloServer from './graphql/server';
import schema from './graphql/schema';

// Start the server
const port = Number(process.env.PORT || 3000);
// const mongoClient = new MongoClient(MONGO_URI);
// const dbName = 'mapmarkersapp-dev';

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    } as ConnectOptions);

    // await mongoClient.connect();
    // const db = mongoClient.db(dbName);

    const httpServer = http.createServer(app);

    const server = apolloServer(app, httpServer, schema);
    // const server = apolloServer(app, httpServer, schema, { db });

    await server.start();
    server.applyMiddleware({ app });

    await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  } catch (error) {
    console.log('start', { error });
  }
}

start();
