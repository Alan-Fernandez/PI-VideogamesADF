import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/index.js";

import { composeWithDevTools } from '@redux-devtools/extension'; // * conexion al browser

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); // * conexion del reducer con el servidor (api/db)

export default store;