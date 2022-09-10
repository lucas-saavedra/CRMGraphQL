


import ProductSchema from "../../schema/Product.schema.js";
import ProductsDao from "./Products.Dao.Db.js";

let dao;
switch ('mongo') {
    case 'mongo':
        dao = new ProductsDao('products', ProductSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following ( MONGO)')
}

const getProductsDao = () => {
    return dao
}
export default getProductsDao;