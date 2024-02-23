const formatVideogames = (array) => {
  const apiVideogames = array.map((object) => {
    return {
      id: object.id,
      name: object.name,
      background_image: object.background_image,
      released: object.released,
      rating: object.rating,
      created: false,
      genres: object.genres.map((element) => ({ name: element.name })),
      platforms: object.platforms.map((element) => ({
        name: element.platform.name,
      })),
    };
  });
  return apiVideogames;
};

module.exports = formatVideogames;
