import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import branchReducer from "./reducers/brachesReducer";
import employeeReducer from "./reducers/employeesReducer";
import positionReducer from "./reducers/positionReducer";

const rootReducer = combineReducers({
  employeeReducer:employeeReducer,
  branchReducer:branchReducer,
  positionReducer:positionReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
