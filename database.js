const { Sequelize } = require("sequelize");

// Connexion à la base de données MySQL
const sequelize = new Sequelize("db_graphql", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Connexion à MySQL réussie !"))
  .catch((err) => console.log("Erreur de connexion à MySQL :", err));

module.exports = sequelize;
