
export const Query = {
    getUser: async (_, { token }) => {
        try {
            const user = await jwt.verify(token, SECRET);
            return user;
        } catch (error) {
            return error;
        }

    },
    getProduct: async (_, { productId }) => {
        try {
            const product = await productAPi.getByIdApi(productId);
            if (!product) {
                throw new Error('Product does not exists');
            }
            return product;

        } catch (error) {
            return error
        }
    },

    getProducts: async () => {
        try {
            const products = await productAPi.getAllApi();
            return products;
        } catch (error) {
            return error;
        }

    },
    getClients: async () => {
        try {
            const clients = await clientApi.getAllApi();
            return clients;
        } catch (error) {
            return error;
        }

    },
    getClientsSeller: async (_, { }, ctx) => {
        try {
            const clients = await clientApi.getAllApi({ seller: ctx.user.id.toString() });
            return clients;
        } catch (error) {
            return error;
        }

    },
    getClient: async (_, { id }, ctx) => {
        try {
            const client = await clientApi.getByIdApi(id);
            if (!client) {
                throw new Error('Client does not exists');
            }
            if (client.seller.toString() !== ctx?.user?.id) {
                throw new Error("You don't have the credentials");
            }
            return client;
        } catch (error) {
            return error;
        }

    },
    getOrders: async () => {
        try {
            const orders = await ordersApi.getAllApi();
            return orders;
        } catch (error) {
            return error;
        }
    },
    getOrder: async (_, { id }, ctx) => {
        try {
            const order = await ordersApi.getByIdApi(id);
            if (!order) {
                throw new Error('Order does not exists');
            }
            if (order.seller.toString() !== ctx?.user?.id) {
                throw new Error("You don't have the credentials");
            }
            return order
        } catch (error) {
            return error;
        }
    },
    getOrdersSeller: async (_, { }, ctx) => {
        try {
            const orders = await ordersApi.getAllApi({ seller: ctx.user.id });
            return orders;
        } catch (error) {
            return error;
        }
    }
}