class ProductsDao {
    async getAll() {
        throw new CustomError(500, "falta implementar getAll")
    }
    async getById(id) {
        throw new CustomError(500, "falta implementar getById")
    }
    async add(element) {
        throw new CustomError(500, "falta implementar insert")
    }
    async updateById(id, element) {
        throw new CustomError(500, "falta implementar updateById")
    }
    async deleteById(id) {
        throw new CustomError(500, "falta implementar deleteById")
    }
    async deleteMany(filter) {
        throw new CustomError(500, "falta implementar deleteMany")
    }
}
export default ProductsDao;