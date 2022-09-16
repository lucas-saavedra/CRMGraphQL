import mongoose from "mongoose";
import DbClient from "../DBClient.js";
import CustomError from "../../utils/customError.utils.js";

let instance;
class MongoClient extends DbClient {
    constructor() {
        super();
        this.client = mongoose;
        this.connected = false;
    }
    async connect() {
        try {
            if (!instance) {
                instance = await this.client.connect(process.env.DB_MONGO);
            }
            return instance;
        } catch (error) {
            throw new CustomError(500, 'Error al conectarse de mongodb', error)
        }
    }
    async disconnect() {
        try {
            await this.client.connection.close();
        } catch (error) {
            throw new CustomError(500, 'Error al desconectarse de mongodb', error)
        }
    }
}

export default MongoClient;