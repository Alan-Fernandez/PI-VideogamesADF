const { Platforms } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { URL_VIDEOGAMES } = require("../helpers/url.helpers");


//  Función para obtener todas las plataforma
const getAllPlatforms = async () => {

// Verifica si no hay plataformas almacenadas en la base de datos
  if ((await Platforms.count()) === 0) {
    const allGames = [];
    const totalPages = 150;
    const pageSize = 40;
    const apiRequests = [];

    for (let pageNumber = 50; pageNumber <= totalPages; pageNumber++) {
      apiRequests.push(
        axios.get(
          `${URL_VIDEOGAMES}?key=${API_KEY}&page=${pageNumber}&page_size=${pageSize}`
        )
      );
    }
    try {
      const responses = await Promise.all(apiRequests);
      
      responses.forEach((response) => {
        const gamesOnPage = response.data.results;
        allGames.push(...gamesOnPage);
      });
    } catch (error) {
      // Manejo de errores en caso de que falle alguna solicitud
      console.error("Error fetching data:", error.message);
    }
    const platformsAuxArray = [];
    allGames.forEach((element) => {
      element.platforms.forEach((object) => {
        platformsAuxArray.push({ name: object.platform.name });
      });
    });
    const allPlatforms = [
      ...new Set(platformsAuxArray.map((element) => JSON.stringify(element))),
    ].map((object) => JSON.parse(object));
    await Platforms.bulkCreate(allPlatforms);
    const platformNames = await Platforms.findAll({
      attributes: ["name"],
    });
    return platformNames;
  } else {
    const platformsQuery = await Platforms.findAll({
      attributes: ["name"],
    });
    return platformsQuery;
  }
};

module.exports = { getAllPlatforms };
