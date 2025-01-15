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
    // Modifier un utilisateur
    updateUser: async (_, { id, input }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      await user.update(input);
      return user;
    },
    // Créer un post pour un utilisateur
    createPost: async (_, { title, content, userId }) => {
      const user = await User.findByPk(userId);
      if (!user) throw new Error("User not found");
      return await Post.create({ title, content, userId });
    },
    // Modifier un post
    updatePost: async (_, { id, input }) => {
      const post = await Post.findByPk(id);
      if (!post) throw new Error("Post not found");
      await post.update(input);
      return post;
    },
    // Supprimer un post
    deletePost: async (_, { id }) => {
      const post = await Post.findByPk(id);
      if (!post) throw new Error("Post not found");
      await post.destroy();
      return post;
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
