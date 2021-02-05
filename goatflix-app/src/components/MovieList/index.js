import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import useIntersectionObserver from '../../utilities/useObserver';
import { MovieGrid, GenreTab, GenreList, LoadMore } from './MovieList.styled';
import Sort from '../Sort';
import Movie from '../Movie';
import genres from '../genres';




const MovieList = ({ match, showFavorite, ...props}) => {
	const [searchQuery, setSearchQuery] = useState('');
	// const [initialMovieList, setInitialMovieList] = useState([]);
	const [initialState, setInitialState] = useState([]);
	const [sortBy, setSortBy] = useState('popularity.desc');
	let voteCount = 100;
	// Require at least 500 votes for the 'top rated' category
	if (sortBy === 'vote_average.desc') voteCount = 500;

	const fetchMovies = async (key, options, page = 1) => {
		const apiURL = searchQuery
			? `https://api.themoviedb.org/3/search/movie?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
			: `https://api.themoviedb.org/3/discover/movie?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=${voteCount}`;
		const { data } = await axios.get(apiURL);
		// setInitialMovieList(data.results)
		setInitialState(data.results)
		// console.log(data.results);
		// return data;
	};
	
	// console.log(initialState)

	const {
		// status,
		// data: pages,
		// results,
		// error,
		// getFetchMore,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
	} = useInfiniteQuery(['movies', { searchQuery, sortBy }], fetchMovies, {
		getFetchMore: (lastGroup, allPages) =>
			 lastGroup.total_pages > lastGroup.page ? lastGroup.page + 1 : null, 
	});
	
	// LoadMore = () => {
	// 	const { credits } = this.props;
	// 	const { movies } = this.state;
	// 	if (castCount === credits.length) return;
	// 	this.setState({ castCount: castCount + 10 });
	// };
	
	// console.log(useInfiniteQuery);
	// console.log(isFetching);
	// console.log(isFetchingMore);
	// console.log(fetchMore);
	// console.log(canFetchMore)

	const movies = [];
	
	// console.log(data.pages[0].results)
	// initialMovieList.forEach(movies => console.log(movies))

	// data.forEach(group => group.results.forEach(movie => movies.push(movie))); ----> 

	// The line of code above was returning "TypeError: Cannot read property 'forEach' of undefined."
	// The reason for the error is because the data had not been set to a state and therefore could not
	// be accessed by our forEach function, even though a console.log would return the data.
	// Used our the initialState I setup and stored the data in that state.
	initialState.forEach(movie => movies.push(movie));

	const { user, isAuthenticated } = useSelector(state => state.auth);

	const loadMoreButtonRef = useRef();
	useIntersectionObserver({
		target: loadMoreButtonRef,
		onIntersect: fetchMore,
		// enabled: canFetchMore,
		enabled: isFetchingMore,
		rootMargin: '500px',
	});

	useEffect(() => {
		if (match.params.query) setSearchQuery(match.params.query);
	}, [match.params]);

	let topComponent;
	if (!showFavorite) {
		!searchQuery
			? (topComponent = <Sort sortBy={sortBy} setSortBy={setSortBy} />)
			: (topComponent = (
					<>
						<h3 id="search-query" >Search term:</h3>
						{/* {searchQuery}  */}
					</>
			  ));
	} else {
		topComponent = <h1>Favorite Movies for {user.name}</h1>;
	}
	// console.log(initialMovieList)
	
	return (
		<>
			{showFavorite && !isAuthenticated && <Redirect to="/login" />}

			{topComponent}

			<MovieGrid id="movie-results">
				{movies.map(movie => (
					<Movie key={movie.id} movie={movie}>
						<h3 id="movieposter-title">{movie.title}</h3>
						<h5 id="movieposter-year">
							{movie.release_date && movie.release_date.split()[0]}
						</h5>
						<GenreList>
							{movie.genre_ids &&
								movie.genre_ids.length &&
								movie.genre_ids.map(genreID => (
									<span key={genreID}>
										{genres.map(
											genre =>
												genreID === genre.id && (
													<GenreTab
														id="movieposter-genre"
														key={genre.name}
													>
														{genre.name}
													</GenreTab>
												)
										)}
									</span>
								))}
						</GenreList>
					</Movie>
				))}
			</MovieGrid>
			{/* )} */}

			{!isFetching && !movies.length && (
				<h2
					id="movie-results"
					style={{ position: 'relative', top: '2rem', fontWeight: 500 }}
				>
					No movies found!
				</h2>
			)}
			
			{isFetchingMore}
			{canFetchMore && (
				<LoadMore type="button" ref={loadMoreButtonRef}>
					Load more
				</LoadMore>
			)}
			{/* {console.log(lastGroup)} */}
		</>
	);
};

export default MovieList;