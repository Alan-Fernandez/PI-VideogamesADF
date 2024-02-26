import { createStore, applyMiddleware, compose } from "redux";
import * as thunkMiddleware from "redux-thunk";
import rootReducer from "../reducer/index";

// * conexion al browser
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleWare))
); // * conexion del reducer con el servidor (api/db)

export default store;