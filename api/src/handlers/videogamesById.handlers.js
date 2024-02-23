const { getVideogamesById } = require("../controllers/videogameById.controller");

const getVideogamesByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const searchSource = isNaN(id) ? "db" : "api";
    const videogame = await getVideogamesById(id, searchSource);
    if (!videogame) {
      res.status(404).json({ error: "error 404: not found" });
    }
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getVideogamesByIdHandler };
