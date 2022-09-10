

import MongoClient from "../../../db/mongo/DBClientMongo.js";
import { MESSAGES, STATUS } from "../../../utils/constants.utils.js";
import CustomError from "../../../utils/customError.utils.js";

class MongoDaoDb {
    constructor(collection, schema) {

        this.client = new MongoClient();
        (async () => {
            this.connection = await this.client.connect();
            this.model = this.connection.model(collection, schema);
        })();

    }
    async findOne(filter = {}) {
        const document = await this.model.findOne(filter, { __v: 0 }).lean();
        return document;
    }
    async getAll(filter = {}) {
        const documents = await this.model.find(filter, { __v: 0 }).lean();
        return documents;
    }
    async getById(id) {
        if (!id) {
            const error = new CustomError(STATUS.BAD_REQUEST, MESSAGES.CAST_ERROR);
            throw error;
        }
        const document = await this.model.findOne({ _id: id }, { __v: 0 }).lean();
        return document;
    }
    async add(element) {
        const newDocument = await this.model.create(element);
        return newDocument;
    }
    async updateById(id, element) {
        if (!id) {
            const error = new CustomError(STATUS.BAD_REQUEST, MESSAGES.CAST_ERROR);
            throw error;
        }
        const updatedDocument = await this.model.findOneAndUpdate(
            { _id: id },
            { ...element },
            { new: true, }
        );
        if (!updatedDocument) {
            const error = new CustomError(STATUS.NOT_FOUND, MESSAGES.NOT_FOUND);
            throw error;
        }
        return updatedDocument;
    }
    async deleteById(id) {
        const deletedDocument = await this.model.findOneAndDelete({ _id: id });
        if (!deletedDocument) {
            const error = new CustomError(STATUS.NOT_FOUND, MESSAGES.NOT_FOUND);
            throw error;
        }
        return deletedDocument;
    }
    async deleteMany(filter = {}) {
        const deletedDocuments = await this.model.deleteMany({ ...filter });
        if (!deletedDocuments.deletedCount) {
            const error = new CustomError(STATUS.NOT_FOUND, MESSAGES.NOT_FOUND);
            throw error;
        }
        return deletedDocuments;
    }
    exit() {
        this.client.disconnect();
    }
}
export default MongoDaoDb;