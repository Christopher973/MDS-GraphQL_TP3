const User = require("./models/User");
const Post = require("./models/Post");

const resolvers = {
  Query: {
    users: async () => {
      return await User.findAll();
    },
    user: async (_, { id }) => {
      return await User.findByPk(id);
    },
    posts: async () => {
      return await Post.findAll();
    },
    post: async (_, { id }) => {
      return await Post.findByPk(id);
    },
  },
  Mutation: {
    // Créer un utilisateur
    createUser: async (_, { input }) => {
      return await User.create(input);
    },
    // Créer un post pour un utilisateur
    createPost: async (_, { input }) => {
      const user = await User.findByPk(input.userId);
      if (user) {
        return await Post.create({ ...input, userId: user.id });
      }
      throw new Error("User not found");
    },
  },
  User: {
    // Résolveur pour obtenir les posts d'un utilisateur
    posts: async (user) => {
      return await Post.findAll({ where: { userId: user.id } });
    },
  },
  Post: {
    // Résolveur pour obtenir l'utilisateur qui a créé le post
    user: async (post) => {
      return await User.findByPk(post.userId);
    },
  },
};

module.exports = resolvers;
