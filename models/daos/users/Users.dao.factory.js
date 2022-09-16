
import UserSchema from "../../schema/User.schema.js";
import UsersDaoDb from "./Users.Dao.Db.js";

let dao;
switch ('mongo') {
    case 'mongo':
        dao = new UsersDaoDb('users', UserSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following ( MONGO)')
}

const getUsersDao = () => {
    return dao
}
export default getUsersDao;