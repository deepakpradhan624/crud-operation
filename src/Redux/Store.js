import { UserReducer } from "./Reducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import logger from "redux-logger"

const rootreducer=combineReducers({user:UserReducer})

const store=configureStore({reducer:rootreducer,middleware:[thunk,logger]})

export default store;