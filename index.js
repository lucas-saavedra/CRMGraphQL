import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import { connectDb } from "./config/db.js";
import { resolvers } from "./db/resolvers.js";
import { typeDefs } from "./db/schema.js";
import { SECRET } from "./env.config.js";


//db connection

connectDb();

//server
const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req }) => {
        const token = req.headers['authorization'] || "";
        if (token) {
            try {
                //Token verification
                const user = jwt.verify(token, SECRET);

                return { user };
            } catch (error) {
                return error
            }
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`${url}`);
});
