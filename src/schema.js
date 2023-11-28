import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLList, GraphQLNonNull } from "graphql"
import { getStores } from "./mysqlConnectors.js";
import { Widgets } from "./mongoConnectors.js"


const storeType = new GraphQLObjectType({
    name: "Store",
    fields: {
        id: {
            type: GraphQLID,
            description: "Unique store identifier"
        },
        name: {
            type: GraphQLString,
            description: "Name of the store"
        },
        location: {
            type: GraphQLString,
            description: "Street address of store"
        },
        hasComplimentaryLobsters: {
            type: GraphQLBoolean,
            description: "Does the store location serve free lobsters to customers?"
        },
    }
})


const productType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: {
            type: GraphQLID,
            description: "Unique product ID"
        },
        name: {
            type: GraphQLString,
            description: "Product name"
        },
        description: {
            type: GraphQLString,
            description: "Detailed description of the product"
        },
        price: {
            type: GraphQLFloat,
            description: "Shelf price of item"
        },
        isSoldOut: {
            type: GraphQLBoolean,
            description: "Product is no longer awailable for purchase"
        },
        stores: {
            type: GraphQLList(storeType),
            description: "List of stores where the product can be purchased",
            resolve: ({ stores }) => getStores(stores)
        },
    }),
    resolve: (_source, { id }) => Widgets.findById(id)
})


export default new GraphQLSchema({

    query: new GraphQLObjectType({
        name: "Query",
        fields: () => ({
            getProducts: {
                type: GraphQLList(productType),
                resolve: () => Widgets.find({})
            },
            getProduct: {
                type: productType,
                args: {
                    id: {
                        type: GraphQLID
                    }
                },
                resolve: (_source, { id }) => Widgets.findById(id)
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: "Mutate",
        fields: {
            updateProduct: {
                type: productType,
                args: {
                    id: {
                        type: GraphQLNonNull(GraphQLString),
                    },
                    name: {
                        type: GraphQLString
                    },
                    description: {
                        type: GraphQLString
                    }
                },
                resolve: (_source, args) => {
                    return Widgets.findById(args.id)
                        .then(product => {
                            const update = Object.assign(product, args)
                            return Widgets.findOneAndUpdate({ _id: args.id }, update, { returnDocument: "after" });
                        })
                }
            }
        }
    }),
    types: [productType, storeType]
});