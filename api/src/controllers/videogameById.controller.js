const { Videogame, Genres, Platforms } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const URL_VIDEOGAMES_BY_ID = "https://api.rawg.io/api/games/";
const formatVideogameId = require("../helpers/formatVideogameById.helpers");

// Función para obtener un videojuego por su ID
const getVideogamesById = async (id, searchSource) => {
  if (searchSource === "db") {
    const dbVideogame = await Videogame.findByPk(id, {
      include: [
        { model: Genres, attributes: ["name"], through: { attributes: [] } },
        { model: Platforms, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    return dbVideogame;
  } else {
    const apiVideogameRaw = (
      await axios.get(`${URL_VIDEOGAMES_BY_ID}${id}?key=${API_KEY}`)
    ).data;
    const apiVideogame = formatVideogameId(apiVideogameRaw);
    return apiVideogame;
  }
};
module.exports = { getVideogamesById };
