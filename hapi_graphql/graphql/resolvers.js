const resolvers = (models) => ({
  Query: {
    getUserById(root, { id }) {
      return models.User.findById(id).then((response) => response);
    },

    getUserByEmail(root, { email }) {
      return models.User.findOne({ email }).then((response) => response);
    },
  },
});

module.exports = resolvers;
