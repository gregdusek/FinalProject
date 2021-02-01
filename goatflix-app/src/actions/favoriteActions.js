import axios from 'axios';
import {
    SET_FAVORITE,
    ADD_FAVORITE,
    DELETE_FAVORITE,
    SET_ERRORS
}
from './typesOfActions';

// Fetches favorite movies/tv list from the active user.
export const setFavorite = () => dispatch => 
    axios
        .get('/api/favorites')
        .then(res => {
                dispatch({
                    type: SET_FAVORITE,
                    payload: res.data,
                });
        })
        .catch(error =>
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data,
                })
        );

// Adds a movie to the active users favorites list.
export const favoriteMovie = movie => dispatch =>
    axios
        .patch(`/api/favorites/add`, movie)
        .then(res => 
                dispatch({
                    type: ADD_FAVORITE,
                    payload: res.data,
                })
        )
        .catch(error =>
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data,
                })
        );

// Remove a movie from the active users favorites list.
export const removeFavorite = movieID => dispatch =>
    axios
        .delete(`/api/favorites/${movieID}`)
        .then(res => 
                dispatch({
                    type: DELETE_FAVORITE,
                    payload: res.data,
                })
        )
        .catch(error => 
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data,
            })
        );

// // Adds a tv show to the active user favorites list.
// export const favoriteTV = tvShow => dispatch =>
// axios
//     .patch(`/api/favorites/add`, tvShow)
//     .then(res => 
//             dispatch({
//                 type: ADD_FAVORITE,
//                 payload: res.data,
//             })
//     )
//     .catch(error =>
//             dispatch({
//                 type: SET_ERRORS,
//                 payload: error.response.data,
//             })
//     );

// // Remove a tv show from the active user favorites list.
// export const removeTV = tvID => dispatch =>
// axios
//     .delete(`/api/favorites/${tvID}`)
//     .then(res => 
//             dispatch({
//                 type: DELETE_FAVORITE,
//                 payload: res.data,
//             })
//     )
//     .catch(error => 
//             dispatch({
//                 type: SET_ERRORS,
//                 payload: error.response.data,
//         })
//     );