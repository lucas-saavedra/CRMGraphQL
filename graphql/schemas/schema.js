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
   type Client {
      id:ID
      name:String
      lastname:String
      email:String
      seller: ID
      organization: String
      phone: String
      createdAt: String
      editedAt: String
   }
   type TopClient{
      total :Float
      client:[Client]
   }
   type TopSeller{
      total :Float
      seller:[Client]
   }
   type Order {
      id:ID!
      order:[OrderGroup]
      total: Float
      client:ID
      seller:ID
      createdAt:String
      state: EstadoPedido
   }
   type OrderGroup {
      id:ID
      quantity:Int
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
   input ClientInput{
      name:String!
      lastname:String!
      email:String!
      organization: String!
      phone: String
   }

   input OrderProductInput {
      id:ID
      quantity :Int
   }

   input OrderInput{
      order: [OrderProductInput]
      total : Float
      client:ID
      state: EstadoPedido
   }
   enum EstadoPedido {
      PENDING,
      COMPLETED,
      CANCELLED
   }
   type Query {
      getUser(token :String!) : User
      getProduct(productId : String!) : Product
      getProducts:[Product]
      getClients: [Client]
      getClient(id:ID!): Client
      getClientsSeller: [Client]
      getOrders:[Order]
      getOrder(id:ID!):Order
      getOrdersSeller:[Order]
      getOrderState(state:String!):[Order]  

      #advanced query
      bestClients:[TopClient]
      bestSellers:[TopSeller]
      searchProduct(input:String!):[Product]
   }

   type Mutation {
      #User
      addUser(userPayload:UserInput!): User
      authUser(authPayload:AuthInput!):Token

      #Product
      addProduct(input:ProductInput!):Product
      updateProduct(id:ID! , payload:ProductInput):Product
      deleteProduct(id:ID!):String

      #Clients
      addClient(input:ClientInput!):Client
      updateClient(id:ID! , payload:ClientInput):Client
      deleteClient(id:ID!):String

      #Orders
      newOrder(input:OrderInput!):Order
      updateOrder(id:ID!,input:OrderInput!):Order
      deleteOrder(id:ID!):String
      
  
      
   }

`;