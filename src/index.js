import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";
import resolvers from "./resolvers.js"

const app = express();

app.get("/", (req, res) => {
    res.send("Yolololololo");
})

const root = resolvers;

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(8080, () => console.log("Running server on port 8080"));