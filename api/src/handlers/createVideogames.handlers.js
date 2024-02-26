const { createVideogame } = require("../controllers/createCideogame.controller");

const createVideogamesHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      background_image,
      released,
      rating,
      genres,
      platforms,
    } = req.body;

    const newVideogame = await createVideogame(
      name,
      description,
      background_image,
      released,
      rating,
      genres,
      platforms
    );
    res.status(201).json(newVideogame);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createVideogamesHandler };
