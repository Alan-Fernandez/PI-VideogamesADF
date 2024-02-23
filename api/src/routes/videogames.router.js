const { Router } = require("express");

const { getVideogamesHandler } = require("../handlers/videogames.handlers");
const {
  getVideogamesByIdHandler,
} = require("../handlers/videogamesById.handlers");
const {
  createVideogamesHandler,
} = require("../handlers/createVideogames.handlers");
const validatePostVideogame = require("../middlewares/validatePostVideogame");
const videogamesRouter = Router();

videogamesRouter.get("/:id", getVideogamesByIdHandler);
videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.post("/", validatePostVideogame, createVideogamesHandler);

module.exports = videogamesRouter;
