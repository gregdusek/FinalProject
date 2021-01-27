import {
    SET_MOVIE_LIST, 
    SET_TV_LIST, 
    SET_LIST_PAGE,
    SET_LIST_SEARCH, 
    SET_LIST_SORT, 
    LOADING_LIST,
    LOADING_MORE, 
    ADD_TO_LIST
} from '../actions/typesOfActions';

// Sets our initial states for our app.
const initialState = {
	films: [],
	page: 1,
	searchQuery: '',
	loading: false,
	loadingMore: false,
	sortBy: 'popularity.desc',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case LOADING_LIST:
			return {
				...state,
				loading: true,
            };
            
		case LOADING_MORE:
			return {
				...state,
				loadingMore: true,
            };
            
		case SET_MOVIE_LIST:
			return {
				...state,
				movies: action.payload.results,
				totalPages: action.payload.total_pages,
				loading: false,
            };
            
        case SET_TV_LIST:
            return {
                ...state,
                tv: action.payload.results,
                totalPages: action.payload.total_pages,
                loading: false,
            };

		case ADD_TO_LIST:
			return {
				...state,
                movies: [...state.movies, ...action.payload.results],
                tv: [...state.tv, ...action.payload.results],
				loadingMore: false,
				page: state.page + 1,
            };
            
		case SET_LIST_PAGE:
			return {
				...state,
				page: action.payload,
            };
            
		case SET_LIST_SEARCH:
			return {
				...state,
				searchQuery: action.payload,
            };
            
		case SET_LIST_SORT:
			return {
				...state,
				sortBy: action.payload,
            };
            
		default:
			return state;
	}
};