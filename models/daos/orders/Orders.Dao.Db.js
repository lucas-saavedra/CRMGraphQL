import MongoDaoDb from "../mongodb/Mongo.dao.js";


class OrdersDao extends MongoDaoDb {
    constructor(collection, schema) {
        super(collection, schema);
    }
    
}
export default OrdersDao;