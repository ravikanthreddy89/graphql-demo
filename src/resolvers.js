const _ = require("lodash");

module.exports = {
  Query: {
    user: async (obj, args, { dataSources }) => {
      //const id = args.id;
      const users = dataSources.users;

      const response = await new Promise((resolve, reject) => {
        users.find().toArray((err, resp) => {
          if (err) {
            console.log("Error in fetching records:" + JSON.stringify(err));
            reject(err);
          }
          console.log("Read response : " + JSON.stringify(resp));
          resolve(resp);
        });
      });

      return response;
    }
  },

  // should be outside of root query
  User: {
    posts: async (obj, {}, { dataSources }) => {
      const authorId = obj.id;

      const posts = dataSources.posts;

      const response = await new Promise((resolve, reject) => {
        posts.find({ author: authorId }).toArray((err, resp) => {
          if (err) {
            console.log("Error in fetching records:" + JSON.stringify(err));
            reject(err);
          }
          console.log("Read response : " + JSON.stringify(resp));
          resolve(resp);
        });
      });
      return response;

      return [
        {
          id: "231",
          text: "some dummy post",
          author: "Rocky"
        }
      ];
    }
  },

  Mutation: {
    createUser: async (obj, { id, name, age }, { dataSources }) => {
      console.log("ID: " + id);
      console.log("Name: " + name);
      console.log("Age: " + age);
      const users = dataSources.users;
      const myObject = {
        id,
        name,
        age
      };
      users.insert({ id: id, name: name, age: age }, (err, res) => {
        if (err) throw err;
        console.log(
          "Successfully inserted the record. Response:" + JSON.stringify(res)
        );
      });
      //return myObject;
    },

    createUserMutation: async (obj, { argument }, { dataSources }) => {
      const users = dataSources.users;
      users.insert(argument, (err, res) => {
        if (err) throw err;
        console.log(
          "Successfully inserted the record. Response:" + JSON.stringify(res)
        );
      });
      return argument;
    }
  }
};
