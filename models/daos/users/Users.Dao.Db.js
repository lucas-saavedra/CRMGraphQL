import MongoDaoDb from "../mongodb/Mongo.dao.js";

class UsersDaoDb extends MongoDaoDb {
    constructor(collection, schema) {
        super(collection, schema);
    }
    async createUser(newUser) {
        try {
            const userCreated = await this.model.create(newUser);
            return userCreated;
        }
        catch (error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new Error('User already registered');
            }
            throw new Error(error);
        }
    };
    async getByUsername(email) {
        try {
            const document = await this.model.findOne({ email }, { __v: 0 }).lean();
            return document;
        } catch (error) {
            throw new Error(error);
        }
    }

}
export default UsersDaoDb;