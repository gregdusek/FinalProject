import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SET_ACTIVE_USER, SET_ERRORS } from './typesOfActions';
import setAuthToken from '../utilities/setAuthToken';

//DOCUMENTATION THAT I REFERENCED FOR AUTHENTICATION
//https://jasonwatmore.com/post/2017/12/07/react-redux-jwt-authentication-tutorial-example
//https://www.obytes.com/blog/authentication-in-react-native-easy-secure-and-reusable-solution


//Register the user
export const registerUser = (userData, history) => dispatch => 
    axios
        .post('backend-api/routes/auth/register', userData)
        .then(() => history.push('/login'))
        .catch(error =>
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            })
         );

//Login - get user token
export const loginUser = (userData, history) => dispatch =>
    axios
        .post('backend-api/routes/auth/login', userData)
        .then(response => {
            //Save to local storage
            const {token} = response.data;
            localStorage.setItem('jwtToken', token);
            //Set token to auth header
            setAuthToken(token);
            //Decode token for userData
            const decoded = jwt_decode(token);
            //Set active user
            dispatch(setActiveUser(decoded));
        })
        .then(() => 
            //Redirects to favorites list
            history.push('/backend-api/favorites')
        )
        .catch(error => 
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            })
        );

//Set active user
export const setActiveUser = decoded => {
    return {
        type: SET_ACTIVE_USER,
        payload: decoded,
    };
};

//User logout
export const logoutUser = history => dispatch => {
    //Remove token from localStorage
    localStorage.removeItem('jwtToken');
    //Remove auth header
    setAuthToken(false);
    //Set active user to {} & sets authentication to false
    dispatch(setActiveUser({}));
    //Redirect back to home page
    history.push('/')
};