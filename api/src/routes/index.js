const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require("./videogames.router");
const genresRouter = require("./genres.router");
const platformsRouter = require("./platforms.router");
const { VIDEOGAMES, GENRES, PLATFORMS } = require("../helpers/routes.helpers");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
function routerApi(app){
    const router = Router();
    app.use('/api/v1', router);
    router.use(VIDEOGAMES, videogamesRouter);
    router.use(GENRES, genresRouter);
    router.use(PLATFORMS, platformsRouter);
}

module.exports = routerApi;
