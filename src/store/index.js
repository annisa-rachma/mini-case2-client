import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import employeeReducer from "./reducers/employeesReducer";
import paymentReducer from "./reducers/paymentReducer";
import reportReducer from "./reducers/reportReducer";
import transferReducer from "./reducers/transferReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  reportReducer: reportReducer,
  paymentReducer:paymentReducer,
  transferReducer: transferReducer,
  employeeReducer:employeeReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
