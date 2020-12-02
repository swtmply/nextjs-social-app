import { serialize } from "cookie";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserInputError } from "apollo-server-micro";

import User from "../../models/User";

export default {
  Query: {
    async users() {
      return await User.find({});
    },
  },
  Mutation: {
    async login(_, { username, password }, { res }) {
      // check if user exists
      const user = await User.findOne({ username });
      if (!user)
        throw new UserInputError("Invalid Input", {
          errors: {
            username: "User not found",
          },
        });
      // TODO: password check and hash

      if (!compare(password, user.password))
        throw new UserInputError("Invalid Input", {
          errors: {
            username: "Invalid Credentials",
          },
        });

      const token = sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
        })
      );

      return {
        token,
        user,
      };
    },
  },
};
