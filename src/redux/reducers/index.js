import { combineReducers } from "redux"

import searchReducer from "./searchReducer.js"
import userReducer from "./userReducer.js"

const reducers = combineReducers({
    search: searchReducer,
    user: userReducer
})

export default reducers