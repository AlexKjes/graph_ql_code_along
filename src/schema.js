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
        location: String
    }

    type Query {
        getProduct(id: ID): Product
        getProducts: [Product]
    }

    input StoreInput {
        location: String
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