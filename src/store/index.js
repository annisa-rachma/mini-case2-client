import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import branchReducer from "./reducers/brachesReducer";
import employeeReducer from "./reducers/employeesReducer";
import paymentReducer from "./reducers/paymentReducer";
import positionReducer from "./reducers/positionReducer";
import reportReducer from "./reducers/reportReducer";
import transferReducer from "./reducers/transferReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  reportReducer: reportReducer,
  paymentReducer:paymentReducer,
  transferReducer: transferReducer,
  employeeReducer:employeeReducer,
  branchReducer:branchReducer,
  positionReducer:positionReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
