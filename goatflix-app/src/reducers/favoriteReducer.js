import {SET_FAVORITE, 
        ADD_FAVORITE, 
        DELETE_FAVORITE} 
        from "../actions/typesOfActions";

const initialState = {
    favorite: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_FAVORITE:
            return {
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
                favorite: [...state.favorite.filter(movie => movie.id !== action.payload), (tvShow => tvShow.id !== action.payload)],
                // favorite: [...state.favorite.filter(tvShow => tvShow.id !== action.payload)],
            };
        default:
            return state;
    }
}