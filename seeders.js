// TP3/seeders.js
const User = require("./models/User");
const Post = require("./models/Post");
const sequelize = require("./database");

const seedDatabase = async () => {
  try {
    // Force la synchronisation de la base de données (supprime et recrée les tables)
    await sequelize.sync({ force: true });

    // Création des utilisateurs
    const users = await User.bulkCreate([
      {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
      },
      {
        firstname: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
      },
      {
        firstname: "Bob",
        lastname: "Johnson",
        email: "bob.johnson@example.com",
      },
    ]);

    // Création des posts
    await Post.bulkCreate([
      {
        title: "Premier post",
        content: "Contenu du premier post",
        userId: users[0].id,
      },
      {
        title: "Deuxième post",
        content: "Contenu du deuxième post",
        userId: users[0].id,
      },
      {
        title: "Post de Jane",
        content: "Contenu du post de Jane",
        userId: users[1].id,
      },
    ]);

    console.log("Base de données remplie avec succès !");
  } catch (error) {
    console.error("Erreur lors du remplissage de la base de données:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
