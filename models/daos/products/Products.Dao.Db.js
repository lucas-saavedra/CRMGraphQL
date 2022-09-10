import MongoDaoDb from "../mongodb/Mongo.dao.js";

class UsersDaoDb extends MongoDaoDb {
    constructor(collection, schema) {
        super(collection, schema);
    }

}
export default UsersDaoDb;