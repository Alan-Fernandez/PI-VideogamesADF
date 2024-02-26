import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CLEAN_DETAIL,
    GET_GENRES,
    GET_PLATFORMS,
    GET_VIDEOGAMES_BY_NAME,
    FILTER_BY_ORIGIN,
    FILTER_BY_GENRES,
    ORDER_VIDEOGAMES,
} from "../actions/type.js";

const initialState = {
    videogamesRender: [],
    allVideogames: [],
    videogamesByName: [],
    videogame: {},
    genres: [],
    platforms: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case GET_VIDEOGAMES:
        return { ...state, allVideogames: payload, videogamesRender: payload };

    case GET_VIDEOGAME_BY_ID:
        return { ...state, videogame: payload };

    case CLEAN_DETAIL:
        return { ...state, videogame: payload };

    case GET_GENRES:
        return { ...state, genres: payload };

    case GET_PLATFORMS:
        return { ...state, platforms: payload };

    case GET_VIDEOGAMES_BY_NAME:
        return { ...state, videogamesByName: payload, videogamesRender: payload };

    case FILTER_BY_ORIGIN:
        {
            let byOrigin = [];

            if (payload === "AllVideogames") {
            byOrigin = state.allVideogames;
            state.videogamesByName = [];
            } else {
            const videogamesToFilter =
                state.videogamesByName.length !== 0
                ? state.videogamesByName
                : state.allVideogames;
            byOrigin =
                payload === "DbVideogames"
                ? videogamesToFilter.filter((videogame) => videogame.created)
                : videogamesToFilter.filter((videogame) => !videogame.created);
            }
            return {
            ...state,
            videogamesRender: byOrigin,
            };
        }

    case FILTER_BY_GENRES:
        {
            state.videogamesRender = state.allVideogames;
            let byGenres = [];
            for (const videogame of state.videogamesRender) {
            if (videogame.genres !== undefined) {
                for (const genre of videogame.genres) {
                if (genre.name === payload) {
                    byGenres.push(videogame);
                }
                }
            }
            }
            return {
            ...state,
            videogamesRender: byGenres,
            };
        }

    case ORDER_VIDEOGAMES:
        {
            let ordered = [...state.videogamesRender];
            ordered =
            payload === "OrderA"
                ? ordered.sort((a, b) => a.name.localeCompare(b.name))
                : payload === "OrderD"
                ? ordered.sort((a, b) => b.name.localeCompare(a.name))
                : payload === "OrderByRatingA"
                ? ordered.sort((a, b) => a.rating - b.rating)
                : ordered.sort((a, b) => b.rating - a.rating);
            return {
            ...state,
            videogamesRender: ordered,
            };
        }
    default:
        return { ...state };
    }
};

export default rootReducer;