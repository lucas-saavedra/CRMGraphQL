import { gql } from "apollo-server";
export const typeDefs =
   gql`
   type Product {
      id:ID
      name: String
      stock: Int
      price: Float
      createdAt: String
      updatedAt: String
   }
   type User {
      id:ID
      name:String
      lastname:String
      email:String
      createdAt: String
      editedAt: String
   }
   type Token {
      token:String
   }


   input UserInput {
      name:String!
      lastname:String!
      email:String!
      password:String!
   }
   input AuthInput {
      email:String!
      password:String!
   }
   input ProductInput {
      name: String!
      stock: Int!
      price: Float!
   }


   type Query {
      getUser(token :String!) : User
      getProduct(productId : String!) : Product
      getProducts:[Product]
   }

   type Mutation {
      #User
      addUser(userPayload:UserInput!): User
      authUser(authPayload:AuthInput!):Token

      #Product
      addProduct(input:ProductInput!):Product
      
   }

`;