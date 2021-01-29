import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        //Add authorization header to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //Deletes the authorization header.
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;