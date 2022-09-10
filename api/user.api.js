import getUsersDao from "../daos/users/Users.dao.factory.js";


class UserApi {
    constructor() {
        this.usersDao = getUsersDao();
    }
    async createUserApi(payload) {
        const userCreated = await this.usersDao.createUser(payload);
        return userCreated;
    }
    async getUserByUsernameApi(payload) {
        const user = await this.usersDao.getByUsername(payload);
        return user;
    }
    async findOneApi(filter = {}) {
        const user = await this.usersDao.findOne(filter);
        return user;
    }
    async getAllApi(filter = {}) {
        const users = await this.usersDao.getAll(filter);
        return users;
    }
    async getByIdApi(id) {
        const user = await this.usersDao.getById(id);
        return user;
    }
    async insertApi(payload) {
        const newUser = await this.usersDao.add(payload);
        return newUser;
    }
    async updateByIdApi(id, updatedPayload) {
        const updatedUser = await this.usersDao.updateById(id, updatedPayload);
        return updatedUser;
    }
    async deleteByIdApi(id) {
        const deletedUser = await this.usersDao.deleteById(id);
        return deletedUser;
    }
    async deleteManyApi(filter) {
        const deletedUsers = await this.usersDao.deleteMany(filter);
        return deletedUsers;
    }

}
export default UserApi;