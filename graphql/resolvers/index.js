import User from "./User";

export default {
  Query: {
    ...User.Query,
  },
  Mutation: {
    ...User.Mutation,
  },
};
