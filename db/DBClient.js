import CustomError from "../utils/customError.utils.js"
class DbClient {
    async connect() {
        throw new CustomError(500)
    }
    async disconnect() {
        throw new CustomError(500)
    }
} export default DbClient