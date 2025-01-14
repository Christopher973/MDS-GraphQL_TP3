const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const sequelize = require("./database");

// Synchroniser les modèles Sequelize avec la base de données
sequelize
  .sync()
  .then(() => {
    console.log("Modèles Sequelize synchronisés avec la base de données.");

    // Création du serveur en lui passant en paramètre les types et les resolvers
    const server = new ApolloServer({ typeDefs, resolvers });

    // Démarrage du serveur
    server.listen(4001).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch((err) => {
    console.error(
      "Erreur lors de la synchronisation des modèles Sequelize:",
      err
    );
  });
