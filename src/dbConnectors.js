import mongoose, { mongo } from "mongoose";


mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/widgets", {
    auth: {
        username: "root",
        password: "password",
        database: "stores"
    },
    authSource: "admin"
})



const widgetSchema = new mongoose.Schema( {
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    isSouldOut: {
        type: String
    },
    stores: {
        type: Array
    }
})

const Widgets = mongoose.model("widgets", widgetSchema);


export { Widgets };