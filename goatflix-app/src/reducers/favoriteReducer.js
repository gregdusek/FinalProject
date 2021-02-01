import {SET_FAVORITE, 
        ADD_FAVORITE, 
        DELETE_FAVORITE} 
        from "../actions/typesOfActions";

const initialState = {
    favorite: [],
};


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) { //Function that uses the initialState as a default value
    //The reducer looks at the action type of field to decide what happens.
    switch (action.type) {
        //Performs an action based our different actions available.
        case SET_FAVORITE:
            //Reducer function being used to handle the logic update for SET_FAVORITE 
            return {
                //Returns the new state with data our data for our SET_FAVORITE action
                ...state,
                favorite: action.payload,
            };
        case ADD_FAVORITE:
            return {
                ...state,
                favorite: [action.payload, ...state.favorite],
            };
        case DELETE_FAVORITE:
            return {
                ...state,
                favorite: [...state.favorite.filter(movie => movie.id !== action.payload)],
                //, (tvShow => tvShow.id !== action.payload)
                // favorite: [...state.favorite.filter(tvShow => tvShow.id !== action.payload)],
            };
        default:
            return state;
    }
}