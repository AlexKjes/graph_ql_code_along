import { Widgets } from "./dbConnectors.js"
import { getStore, getStores } from "./mysqlConnectors.js"


const resolvers = {
    getProduct: ({ id }) => {
        return new Promise((resolve, reject) => {
            Widgets.findById({ _id: id })
                .then(p => {
                    getStores(p.stores.map(s => s.id))
                        .then(stores => {
                            p.stores = stores;
                            resolve(p)
                        })
                })
                .catch(err => reject(err))
        })
    },
    getProducts: () => new Promise((res, rej) => Widgets.find({})
        .then(ps => {
            const storePromise = ps.map(p => {
                return getStores(p.stores.map(s => s.id))
                    .then(stores => {p.stores = stores; return Promise.resolve()})
            })
            return Promise.all(storePromise).then(() => Promise.resolve(ps))
        }).then(ps =>
            res(ps)
        )
        .catch(err => rej(err))),
    createProduct: ({ input }) => {
        return new Promise((res, rej) => {
            Widgets.create(input)
                .then(p => {
                    res(p)
                })
                .catch(err => rej(err))
        })
    }
}

export default resolvers;