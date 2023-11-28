import { buildSchema} from "graphql"

const schema = buildSchema((`
    type Product {
        id: ID
        name: String
        description: String
        price: Float
        isSoldOut: Boolean
        stores: [Store]! 
    }

    type Store {
        id: ID
        location: String
        name: String
        hasComplimentaryLobsters: Boolean
    }

    type Query {
        getProduct(id: ID): Product
        getProducts: [Product]
    }

    input StoreInput {
        id: ID
    }

    input ProductInput {
        name: String
        description: String
        price: Float
        isSoldOut: Boolean
        stores: [StoreInput]! 
    }

    type Mutation {
        createProduct(input: ProductInput): Product
    }
`))

export default schema;