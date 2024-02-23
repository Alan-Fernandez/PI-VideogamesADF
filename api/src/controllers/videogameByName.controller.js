const { Videogame, Genres, Platforms } = require("../db");
const axios = require("axios");
const URL_VIDEOGAMES_BY_NAME = "https://api.rawg.io/api/games?search=";
const { API_KEY } = process.env;

const formatVideogames = require("../helpers/formatVideogames.helpers");
const { Op } = require("sequelize");
const apiGames = 15;

const searchVideogamesByName = async (name) => {
  name.toLowerCase();
  const dataBaseVideogame = await Videogame.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: [
      { model: Genres, attributes: ["name"], through: { attributes: [] } },
      { model: Platforms, attributes: ["name"], through: { attributes: [] } },
    ],
  });
  const apiGamesMax = apiGames - dataBaseVideogame.length;
  const apiVideogameRaw = (
    await axios.get(
      `${URL_VIDEOGAMES_BY_NAME}${name}&key=${API_KEY}&page_size=${apiGamesMax}`
    )
  ).data.results;
  const apiVideogame = formatVideogames(apiVideogameRaw);
  if (dataBaseVideogame.length || apiVideogame.length) {
    return [...dataBaseVideogame, ...apiVideogame];
  } else {
    return `No matches found with ${name}`;
  }
};

module.exports = { searchVideogamesByName };
