import getProductsDao from "../daos/products/Products.dao.factory.js";

class ProductApi {
    constructor() {
        this.dao = getProductsDao();
    }

    async findOneApi(filter = {}) {
        const product = await this.dao.findOne(filter);
        return product;
    }
    async getAllApi(filter = {}) {
        const products = await this.dao.getAll(filter);
        return products;
    }
    async getByIdApi(id) {
        const product = await this.dao.getById(id);
        return product;
    }
    async insertApi(payload) {
        const newProduct = await this.dao.add(payload);
        return newProduct;
    }
    async updateByIdApi(id, updatedPayload) {
        const updatedProduct = await this.dao.updateById(id, updatedPayload);
        return updatedProduct;
    }
    async deleteByIdApi(id) {
        const deletedProduct = await this.dao.deleteById(id);
        return deletedProduct;
    }


}
export default ProductApi;