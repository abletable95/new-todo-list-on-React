import { combineReducers } from "redux";
import{todoReducer}from './todoReducer';
import{searchReducer}from './searchReducer';


export const rootReducer = combineReducers({
    todos: todoReducer,
    searchResults: searchReducer
})