export const Mutation = {
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
    }

}