import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { SECRET } from "../env.config.js";

import UserApi from "../api/user.api.js";
import ProductApi from "../api/products.api.js";

const userApi = new UserApi();
const productAPi = new ProductApi();

const setToken = (userPayload, secret, expiresIn) => {
    const { name, lastname, id, email } = userPayload;
    return jwt.sign({ id, name, lastname, email }, secret, { expiresIn })
}
export const resolvers = {
    Query: {
        getUser: async (_, { token }) => {
            const user = await jwt.verify(token, SECRET);
            return user;
        },
        getProduct: async (_, { productId }) => {
            const product = productAPi.getByIdApi(productId);
            return product;
        },
        getProducts: async () => {
            const products = productAPi.getAllApi();
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
        }


    }
};