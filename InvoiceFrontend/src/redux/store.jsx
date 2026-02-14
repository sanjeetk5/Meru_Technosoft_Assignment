import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";

import { invoiceReducer } from "./reducers/invoiceReducer";
import { authReducer } from "./auth/authReducer";

const rootReducer = combineReducers({
  invoiceState: invoiceReducer,
  authState: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
