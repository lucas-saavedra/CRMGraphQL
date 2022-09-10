import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()
/**
 * @returns an instance of the connection to mongodb 
 */

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            dbName: "CRMGraphQL"
        });
        console.log('Db connected');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}