import CustomError from "../utils/customError.utils.js"
class DbClient {
    async connect() {
        throw new CustomError(500, "falta implementar 'connect' en subclase!")
    }
    async disconnect() {
        throw new CustomError(500, "falta implementar 'disconnect' en subclase!")
    }
} export default DbClient