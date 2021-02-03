// Dependecy Packages
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from "axios";

// Action dependencies
import setAuthToken from '../../utilities/setAuthToken';
import { setActiveUser, logoutUser } from '../../actions/authActions';
import { setFavorite } from '../../actions/favoriteActions';

// Component dependencies
import MoviesList from '../MovieList';
import MovieCard from '../MovieCard';
// import TVList from '../TVList';
// import TVCard from '../TVCard';
import NavBar from '../NavBar';
import Register from '../Register';
import Login from '../Login';

// Style dependencies
import { StyledApp, GlobalStyle } from './App.styled';

//State store
import store from '../../store';

// Check for token
if (localStorage.jwtToken) {
	// Set auth token to header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Log user out
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = '/login';
	} else {
		// Set user, isAuthenticated and hearted films
		store.dispatch(setActiveUser(decoded));
		store.dispatch(setFavorite());
	}
}



function App() {
    axios({
        method: "GET",
        url: "(https://goatflix.herokuapp.com/api/resource)",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res.data.message);
    });

    return(
      <Router>
          <StyledApp>
              <GlobalStyle />
              <NavBar />
              <Switch>
                    <Route exact path="/" component={MoviesList} />
                    {/* <Route exact path="/" component={TVList} /> */}
                    <Route exact path="/p=:page" component={MoviesList} />
                    {/* <Route exact path="/p=:page" component={TVList} /> */}
                    <Route exact path="/search=:query" component={MoviesList} />
                    {/* <Route exact path="/search=:query" component={TVList} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/favorite" render={() => <MoviesList showFavorite={true} />} />
                    {/* <Route exact path="/favorite" render={() => <TVList showFavorite={true} />} /> */}
                    <Route path="/search=:query/p=:page" component={MoviesList} />
                    {/* <Route path="/search=:query/p=:page" component={TVList} /> */}
                    <Route path="/:id" component={MovieCard} />
                    {/* <Route path="/:id" component={TVCard} /> */}
              </Switch>
          </StyledApp>
      </Router>
    );
};

export default App;
