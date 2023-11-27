import { Widgets } from "./dbConnectors.js"


const resolvers = {
    getProduct: ({ id }) => {
        return new Promise((resolve, reject) => {
            Widgets.findById({ _id: id })
                .then(p => resolve.apply(p))
                .catch(err => reject(err))
        })
    },
    getProducts: () => new Promise((res, rej) => Widgets.find({})
        .then(ps => res(ps))
        .catch(err => rej(err))),
    createProduct: ({input}) => {
        return new Promise((res, rej) => {
            console.log(input);
            Widgets.create(input)
                .then(p => {
                    console.log(p);
                    res(p)
                })
                .catch(err => rej(err))
        })
    }
}

export default resolvers;