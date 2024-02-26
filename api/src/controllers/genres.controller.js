const { Genres } = require("../db");

const axios = require("axios");
const { API_KEY } = process.env;
const { URL_GENRES, LIMIT } = require("../helpers/url.helpers");
const genresAuxArray = [];

const getAllGenres = async () => {

  if ((await Genres.count()) === 0) {
    const apiGenres = await axios(`${URL_GENRES}?key=${API_KEY}&limit=${LIMIT}`);

    apiGenres.data.results.forEach((element) => {
      return genresAuxArray.push({ name: element.name });
    });

    await Genres.bulkCreate(genresAuxArray);

    return Genres.findAll({ model: Genres, attributes: ["name"] });

  } else {
    
    const genresQuery = await Genres.findAll({
      model: Genres,
      attributes: ["name"],
    });
    return genresQuery;
  }
};

module.exports = { getAllGenres };
