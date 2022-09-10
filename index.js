import { ApolloServer } from "apollo-server";
import { connectDb } from "./config/db.js";
import { resolvers } from "./db/resolvers.js";
import { typeDefs } from "./db/schema.js";


//db connection

connectDb();

//server
const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen().then(({ url }) => {
    console.log(`${url}`);
});
