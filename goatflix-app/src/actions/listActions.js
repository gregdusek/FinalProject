import axios from 'axios';
import {
    SET_MOVIE_LIST, 
    SET_TV_LIST, 
    SET_LIST_PAGE,
    SET_LIST_SEARCH, 
    SET_LIST_SORT, 
    LOADING_LIST,
    LOADING_MORE, 
    SET_ERRORS, 
    ADD_TO_LIST
} from './typesOfActions';

//Sets the list to loading.
export const setLoadingList = () => ({
    type: LOADING_LIST
});

// Loads more query results past the first page.
export const setLoadingMore = () => ({
    type: LOADING_MORE
});

//Updates the current movie list.
export const updateMovieList = (
    page = 1,
    searchQuery = '',
    sortBy = 'popularity.desc'
) => dispatch => {
    // calls the setLoadingList action and triggers loadingList state.
    dispatch(setLoadingList());
    let voteCount = 100;
    // Sets movie requirement of having 500 votes to be in the top rated category.
    if (sortBy === 'vote_average.desc') voteCount = 500;
    let apiURL;

    searchQuery
        ? (apiURL = `https://api.themoviedb.org/3/search/movie?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`)
        : (apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=${voteCount}`);
    
    axios
        .get(apiURL)
        //make our call to fetch our data from the API
        .then(res => dispatch ({
        //dispatches a function to set our movie list with the data fetched from the API
            type: SET_MOVIE_LIST,
            payload: res.data,
        })
    )
        //or it catches the error if there's an error and returns the error back to us.
        .catch(error => dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        })
    );
};

// Updates the tv loading list.
export const updateTVList = (
    page = 1,
    searchQuery = '',
    sortBy = 'popularity.desc'
) => dispatch => {
    // calls the setLoadingList action and triggers loadingList state.
    dispatch(setLoadingList());
    let voteCount = 100;
    // Sets tv requirement of having 500 votes to be in the top rated category.
    if (sortBy === 'vote_average.desc') voteCount = 500;
    let apiURL;

    searchQuery
            ? (apiURL = `https://api.themoviedb.org/3/search/tv?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`)
            : (apiURL = `https://api.themoviedb.org/3/discover/tv?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=${voteCount}`);
    
    axios
        .get(apiURL)
        //make our call to fetch our data from the API.
        .then(res => dispatch ({
        //dispatches a function to set our tv list with the data fetched from the API.
            type: SET_TV_LIST,
            payload: res.data,
        })
    )
        //or it catches the error if there's an error and returns the error back to us.
        .catch(error => dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        })
    );
};

// Sets our current list to the page.
export const setListPage = page => dispatch => {
        dispatch({
                type: SET_LIST_PAGE, 
                payload: page
        });
};

// Sets the current search query
export const setSearchQuery = query => dispatch =>
	dispatch({
		type: SET_LIST_SEARCH,
		payload: query,
    });
    
// Sets the list sorting order
export const setSortBy = sortBy => dispatch => {
	dispatch({
		type: SET_LIST_SORT,
		payload: sortBy,
	});
};

// Reset the movie list to all default values
export const resetMoviesList = async () => async dispatch => {
	await setListPage(1);
	await setSearchQuery('');
	await setSortBy('popularity.desc');
	updateMovieList();
};

// Loads more movies for paginate
export const loadMore = (newPage, searchQuery = '', sortBy) => dispatch => {
    dispatch(setLoadingMore());
    let voteCount = 100;
    if (sortBy === 'vote_average.desc') voteCount = 500;
    let apiURL;

    searchQuery
            ? (apiURL = `https://api.themoviedb.org/3/search/movie?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`)
            : (apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=${voteCount}`);
    axios
            .get(apiURL)
            .then(res => 
                dispatch ({
                    type: ADD_TO_LIST,
                    payload: res.data,
                })
            )
            .catch(error =>
                dispatch({
                    type:SET_ERRORS,
                    payload: error.response.data,
                })
            );
};