import { combineReducers } from "redux"

import searchReducer from "./searchReducer.js"

const reducers = combineReducers({
    search: searchReducer,
})

export default reducers