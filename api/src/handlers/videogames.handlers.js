const { searchVideogamesByName } = require("../controllers/videogameByName.controller");
const { getAllVideogames } = require("../controllers/videogame.controller");

const getVideogamesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const typeSearch = name
      ? await searchVideogamesByName(name)
      : await getAllVideogames();
    res.status(200).json(typeSearch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getVideogamesHandler };
