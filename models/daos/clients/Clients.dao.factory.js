import ClientSchema from "../../schema/Client.schema.js";
import ClientsDaoDb from "./Clients.Dao.Db.js";


let dao;
switch ('mongo') {
    case 'mongo':
        dao = new ClientsDaoDb('clients', ClientSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following (MONGO)')
}

const getClientsDao = () => {
    return dao
}
export default getClientsDao;