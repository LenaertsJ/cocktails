import * as redux from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import cartReducer from "./cart";
import countReducer from "./counter";
import cocktailReducer from "./cocktails";

const rootReducer = redux.combineReducers({
  countState: countReducer,
  cartState: cartReducer,
  cocktailState: cocktailReducer,
});

const store = redux.createStore(
  rootReducer,
  redux.applyMiddleware(logger, thunk)
);

export default store;
