import getClientsDao from "../models/daos/clients/Clients.dao.factory.js";


class ClientApi {
    constructor() {
        this.dao = getClientsDao();
    }

    async findOneApi(filter = {}) {
        const user = await this.dao.findOne(filter);
        return user;
    }
    async getAllApi(filter = {}) {
        const users = await this.dao.getAll(filter);
        return users;
    }
    async getByIdApi(id) {
        const user = await this.dao.getById(id);
        return user;
    }
    async insertApi(payload) {
        const newUser = await this.dao.add(payload);
        return newUser;
    }
    async updateByIdApi(id, updatedPayload) {
        const updatedUser = await this.dao.updateById(id, updatedPayload);
        return updatedUser;
    }
    async deleteByIdApi(id) {
        const deletedUser = await this.dao.deleteById(id);
        return deletedUser;
    }

}
export default ClientApi;