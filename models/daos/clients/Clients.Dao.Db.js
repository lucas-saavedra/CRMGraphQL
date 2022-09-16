import MongoDaoDb from "../mongodb/Mongo.dao.js";

class ClientsDaoDb extends MongoDaoDb {
    constructor(collection, schema) {
        super(collection, schema);
    }
}
export default ClientsDaoDb;