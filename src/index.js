const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers");

const {
  makeExecutableSchema,
  transformSchema,
  FilterRootFields,
  RenameTypes,
  FilterTypes,
  mergeSchemas
} = require("graphql-tools");

let db;
let collection;
const { MongoClient } = require("mongodb");

const startServer = async function() {
  MongoClient.connect(
    "mongodb://idaasuser:identity1@ds257579.mlab.com:57579/commentbox",
    { useNewUrlParser: true, poolSize: 10 }
  )
    .then(client => {
      console.log("Connection created to mongodb");
      db = client.db("commentbox");
    })
    .catch(error => console.error(error));

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const transformedSchema = transformSchema(schema, [
    [
      new FilterTypes(type => {
        if (type === "Mutation") return false;
        else return true;
      })
    ]
  ]);

  const server = new ApolloServer({
    schema: transformedSchema,
    //typeDefs,
    //resolvers,
    dataSources: () => ({
      users: db.collection("users"),
      posts: db.collection("posts"),
      comments: db.collection("comments")
    })
  });

  server.listen({ port: 8080 }).then(({ url }) => {
    console.log("New log statements...............");
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();
