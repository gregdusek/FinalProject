// Using combine reducers in your app.
// https://redux.js.org/api/combinereducers
// https://redux.js.org/recipes/structuring-reducers/using-combinereducers
// https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers

import {combineReducers} from 'redux';
import errorsReducer from './errorsReducer';
import favoriteReducer from './favoriteReducer';
import listReducer from './listReducer';
import authReducer from './authReducer';

export default combineReducers({
    favorite: favoriteReducer,
    errors: errorsReducer,
    auth: authReducer,
    list: listReducer, 
});