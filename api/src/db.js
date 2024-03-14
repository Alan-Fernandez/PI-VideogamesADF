require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { VIDEOGAMES } = require("./helpers/routes.helpers");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}${VIDEOGAMES}`,
  {
    logging: false,
    native: false, 
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genres, Platforms } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genres, { through: "videogame_genres" });
Genres.belongsToMany(Videogame, { through: "videogame_genres" });
Videogame.belongsToMany(Platforms, { through: "videogame_platforms" });
Platforms.belongsToMany(Videogame, { through: "videogame_platforms" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
