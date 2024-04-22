import {combineReducers} from '@reduxjs/toolkit'
import controllerReducer from "../../components/controller/reducer/controller";
import requests from "./requests";
import scene from "./scene";


const rootReducer = combineReducers({
  controllerReducer,
  [requests.name]: requests.reducer,
  [scene.name]: scene.reducer,
});


export default rootReducer;
