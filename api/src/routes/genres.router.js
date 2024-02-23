const { Router } = require("express");

const { getGenresHandler } = require("../handlers/genres.handlers");
const genresRouter = Router();

genresRouter.get("/", getGenresHandler);

module.exports = genresRouter;
