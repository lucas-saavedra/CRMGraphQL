import MongoDaoDb from "../mongodb/Mongo.dao.js";


class OrdersDao extends MongoDaoDb {
    constructor(collection, schema) {
        super(collection, schema);
    }
    async getOrdersPopulated(filter) {
        const documents = await this.model.find(filter, { __v: 0 }).populate('client');
        return documents;
    }

}
export default OrdersDao;