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

Widgets.find({})
.then(result => {
    if (result.length === 0) {
        console.log("Populating MongoDB");
        Widgets.create({name: "SWAG", description: "Stuff we all get", price: 9.99, isSouldOut: false, stores: [1, 2]})

    }
})

export { Widgets };