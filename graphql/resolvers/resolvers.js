
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { SECRET } from "../../env.config.js";
import { UserInputError } from "apollo-server";

import UserApi from "../../api/user.api.js";
import ProductApi from "../../api/products.api.js";
import ClientApi from "../../api/client.api.js";
import OrderApi from "../../api/order.api.js";

const userApi = new UserApi();
const productAPi = new ProductApi();
const clientApi = new ClientApi();
const ordersApi = new OrderApi();

const setToken = (userPayload, secret, expiresIn) => {
    const { name, lastname, id, email } = userPayload;
    return jwt.sign({ id, name, lastname, email }, secret, { expiresIn })
}
export const resolvers = {
    Query: {
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
        },
        getOrderState: async (_, { state }, ctx) => {
            try {
                const orders = await ordersApi.getAllApi({ seller: ctx.user.id, state });
                return orders;
            } catch (error) {
                return error;
            }
        },
        bestClients: async () => {
            const clients = await ordersApi.agregation([
                { $match: { state: "COMPLETED" } },
                {
                    $group: {
                        _id: "$client",
                        total: { $sum: '$total' }
                    }
                },
                {
                    $lookup: {
                        from: 'clients',
                        localField: '_id',
                        foreignField: "_id",
                        as: "client"
                    }
                },
                { $sort: { total: -1 } }
            ]);
            return clients;
        },
        bestSellers: async () => {
            const sellers = await ordersApi.agregation([
                { $match: { state: "COMPLETED" } },
                {
                    $group: {
                        _id: "$seller",
                        total: { $sum: '$total' }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: "_id",
                        as: "seller"
                    }
                },
                { $limit: 3 },
                { $sort: { total: -1 } }
            ]);
            return sellers;
        },
        searchProduct: async (_, { input }) => {
            const products = await productAPi.getAllApi({ $text: { $search: input } })
            return products;
        }


    },
    Mutation: {
        //Users
        addUser: async (_, { userPayload }) => {
            const { email, password } = userPayload;
            const userExists = await userApi.findOneApi({ email });

            //Si el usuario está registrado
            if (userExists) {
                throw new Error('User already exists');
            }

            // *Hash data

            const salt = await bcryptjs.genSalt(10);
            userPayload.password = await bcryptjs.hash(password, salt);

            //*saving data

            try {
                const user = await userApi.createUserApi(userPayload);
                return user;
            } catch (error) {
                console.log(error);
            }
        },
        authUser: async (_, { authPayload }) => {

            const { email, password } = authPayload;
            const userExists = await userApi.findOneApi({ email });
            //checking if the user is already registered
            if (!userExists) {
                throw new Error('User does not exists');
            }
            // check the password
            const passwordCheck = await bcryptjs.compare(password, userExists.password);
            if (!passwordCheck) {
                throw new Error('Password not correct');
            }
            //generate token
            return {
                token: setToken(userExists, SECRET, '24h')
            }
        },


        //Products
        addProduct: async (_, { input }) => {
            try {
                const product = await productAPi.insertApi(input);
                return product;
            } catch (error) {
                console.log(error);
            }
        },
        updateProduct: async (_, { id, payload }) => {
            try {
                const product = await productAPi.getByIdApi(id);
                if (!product) {
                    throw new Error('Product does not exists');
                }
                const updatedProduct = await productAPi.updateByIdApi(id, payload);
                return updatedProduct;
            } catch (error) {
                console.log(error);
            }
        },
        deleteProduct: async (_, { id }) => {
            try {
                const product = await productAPi.getByIdApi(id);

                if (!product) {
                    throw new Error('Product does not exists');
                }
                await productAPi.deleteByIdApi(id);
                return "Product has been deleted"
            } catch (error) {
                return error;
            }
        },

        //Clients
        addClient: async (_, { input }, ctx) => {
            try {
                const { email } = input;
                const client = await clientApi.findOneApi({ email });
                if (client) {
                    throw new UserInputError('Client was already registedred');
                }
                const newClient = await clientApi.insertApi({ ...input, seller: ctx.user.id });
                return newClient
            } catch (error) {
                return error;
            }

        },
        updateClient: async (_, { id, payload }, ctx) => {
            try {
                const client = await clientApi.getByIdApi(id);
                if (!client) {
                    throw new Error('Client does not exists');
                }
                if (client.seller.toString() !== ctx?.user?.id) {
                    throw new Error("You don't have the credentials");
                }
                const updatedClient = await clientApi.updateByIdApi(id, payload);
                return updatedClient;
            } catch (error) {
                return error;
            }
        },
        deleteClient: async (_, { id }, ctx) => {
            try {
                const client = await clientApi.getByIdApi(id);
                if (!client) {
                    throw new Error('Client does not exists');
                }
                if (client.seller.toString() !== ctx?.user?.id) {
                    throw new Error("You don't have the credentials");
                }
                await clientApi.deleteByIdApi(id);
                return "Client has been deleted"
            } catch (error) {
                return error;
            }
        },
        //Orders
        newOrder: async (_, { input }, ctx) => {
            const { client } = input;
            const clientExists = await clientApi.getByIdApi(client);
            if (!clientExists) {
                throw new Error('Client does not exists');
            }
            if (clientExists.seller.toString() !== ctx?.user?.id) {
                throw new Error("You don't have the credentials");
            }
            for await (const element of input.order) {
                const { id } = element;
                const product = await productAPi.getByIdApi(id);
                if (element.quantity > product.stock) {
                    throw new Error(`The product [ ${product.name} ] exceed the actual stock`);
                } else {
                    const stock = product.stock - element.quantity;
                    await productAPi.updateByIdApi(product.id, { stock })
                }
            };

            const newOrder = await ordersApi.insertApi({ ...input, seller: ctx.user.id })
            return newOrder;
        },
        updateOrder: async (_, { id, input }, ctx) => {
            const { client: clientId } = input;
            try {
                const order = await ordersApi.getByIdApi(id);
                if (!order) {
                    throw new Error('Order does not exists');
                }
                const client = await clientApi.getByIdApi(clientId);
                if (!client) {
                    throw new Error('Client does not exists');
                }
                if (order.seller.toString() !== ctx?.user?.id) {
                    throw new Error("You don't have the credentials");
                }
                if (input.order) {
                    for await (const element of input.order) {
                        const { id } = element;
                        const product = await productAPi.getByIdApi(id);
                        if (element.quantity > product.stock) {
                            throw new Error(`The product [ ${product.name} ] exceed the actual stock`);
                        } else {
                            const stock = product.stock - element.quantity;
                            await productAPi.updateByIdApi(product.id, { stock })
                        }
                    };
                }


                const updatedOrder = await ordersApi.updateByIdApi(id, input);
                return updatedOrder;
            } catch (error) {
                return error;
            }
        },
        deleteOrder: async (_, { id }, ctx) => {
            try {
                const order = await ordersApi.getByIdApi(id);
                if (!order) {
                    throw new Error('Order does not exists');
                }
                if (order.seller.toString() !== ctx?.user?.id) {
                    throw new Error("You don't have the credentials");
                }
                await ordersApi.deleteByIdApi(id);
                return "Order has been deleted"
            } catch (error) {
                return error;
            }
        },
    }
};