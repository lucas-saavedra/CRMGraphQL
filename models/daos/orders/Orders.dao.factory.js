import OrderSchema from "../../schema/Order.schema.js";
import OrdersDao from "./Orders.Dao.Db.js";

let dao;
switch ('mongo') {
    case 'mongo':
        dao = new OrdersDao('orders', OrderSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following (MONGO)')
}

const getDao = () => {
    return dao
}
export default getDao;