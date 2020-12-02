import { ApolloServer } from "apollo-server-micro";

import resolvers from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/typeDefs";

// database
import database from "../../utils/mongo";

database();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
