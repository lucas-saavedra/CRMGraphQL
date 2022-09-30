import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import { connectDb } from "./config/db.js";

import { SECRET } from "./env.config.js";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import { typeDefs } from "./graphql/schemas/schema.js";


//db connection

connectDb();

//server
const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req }) => {
        const token = req.headers['authorization'] || "";
        if (token) {
            try {
                //Token verification
                const user = jwt.verify(token.replace("Bearer ", ""), SECRET);
                return { user };
            } catch (error) {
                return error
            }
        }
    }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`${url}`);
});
