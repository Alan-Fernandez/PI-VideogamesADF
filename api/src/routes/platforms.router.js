const { Router } = require("express");

const { getPlatformsHandler } = require("../handlers/platforms.handlers");
const platformsRouter = Router();

platformsRouter.get("/", getPlatformsHandler);

module.exports = platformsRouter;
