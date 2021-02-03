import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import commaNumber from 'comma-number';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Trailer from '../Trailer';
import blankPhoto from '../images/blank.png';
import { favoriteMovie, removeFavorite } from '../../actions/favoriteActions';
import { Poster } from '../Movie/Movie.styled.js';
import Cast from '../Cast';
import {
	MovieWrapper,
	Background,
	MovieInfo,
	MainContent,
	SidePanel,
    GenreTab,
    Votes,
	SideStat,
	Overview,
	MainTitle,
	SideTitle,
	BackButton,
	RelatedMovies,
	FavoriteButton,
	RemoveFavoriteButton,
} from './MovieCard.styled';

export const POSTER_PATH = 'https://image.tmdb.org/t/p/w300';
const POSTER_PATH_SMALL = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieCard extends Component {
	state = {
		id: '',
		movie: {},
		credits: {},
		videos: [],
		trailer: {},
		Background: '',
		loading: true,
	};

	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		match: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.string,
			}),
		}).isRequired,
		auth: PropTypes.object.isRequired,
		favorite: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
		favoriteMovie: PropTypes.func.isRequired,
		removeFavorite: PropTypes.func.isRequired,
	};

	static contextTypes = {
		router: () => null,
	};

	componentDidMount = () => {
		this.setState({ id: this.props.match.params.id });
		this.setMovie();
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.id !== prevState.id) return { id: nextProps.match.params.id };
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.setMovie();
		}
	}

	setMovie= async () => {
		const { id } = this.state;
		// load movie details
		try {
			const movieRes = await fetch(
				`https://api.themoviedb.org/3/movie/${id}?api_key=f1b89107537867c1b021fa9fe5da19b8&language=en-US&append_to_response=credits,videos`
			);
			const movie = await movieRes.json();

			const trailer = movie.videos.results.filter(
				video => video.site === 'YouTube' && video.type === 'Trailer'
			)[0];

			this.setState({
				movie,
				credits: movie.credits,
				videos: movie.videos.results,
				trailer,
				loading: false,
			});

			// Start at the top of the new page
			window.scrollTo(0, 0);
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	};

	render() {
		const {
			movie,
			credits,
			loading,
			trailer,
		} = this.state;
		const { history, favorite, auth } = this.props;

		let director;
		if (credits.crew) director = credits.crew.filter(member => member.job === 'Director')[0];

		// Indicates if a movie has been added as a favorite.
		let movieFavorite = false;
		favorite.favorite.forEach(movie => {
			if (movie.id) movieFavorite = true;
		});

		return (
			<MovieWrapper>
				{loading}
				{!loading && movie && !movie.status_code && (
					<Fragment>
						<Background
							backdrop={
								Object.keys(movie).length &&
								`${BACKDROP_PATH}${movie.backdrop_path}`
							}
						/>
						{console.log(BACKDROP_PATH)}
						{console.log(movie.backdrop_path)}
						<MovieInfo>
							<SidePanel>
								<SideTitle>
									<h1 id="movie-title" style={{ display: 'inline' }}>
										{movie.title}
									</h1>
									<h4 id="movie-tagline">{movie.tagline}</h4>
								</SideTitle>
								<Poster
									id="movie-poster"
									src={
										Object.keys(movie).length &&
										`${POSTER_PATH}${movie.poster_path}`
									}
									alt={movie.title}
								/>
								<Votes>
									<div>
										<span id="vote-average">{movie.vote_average}</span>
										/10
										<span
											style={{
												margin: '1rem',
												fontSize: '1.1rem',
												color: '#ffb500',
											}}
										>
											(
											<span id="vote-count">{movie.vote_count}</span>{' '}
											votes)
										</span>
									</div>
								</Votes>
								<div>
									{movieFavorite === true ? (
										<RemoveFavoriteButton
											onClick={() => {
												this.props.removeFavorite(movie.id);
											}}
										>
											Remove Favorite
										</RemoveFavoriteButton>
									) : (
										<FavoriteButton
											onClick={() => {
												auth.isAuthenticated
													? this.props.favoriteMovie(movie)
													: history.push('/login');
											}}
										>
											Favorite
										</FavoriteButton>
									)}
								</div>
								<div>
									{movie.genres &&
										movie.genres.map(genre => (
											<GenreTab id="movie-genre" key={genre.name}>
												{genre.name}
											</GenreTab>
										))}
								</div>

								<SideStat>
									<span>Released:</span>
									<h3 id="movie-release-date">{movie.release_date}</h3>
								</SideStat>

								<SideStat>
									<span>Director</span>
									<h3>{director.name}</h3>
								</SideStat>

								<SideStat>
									<span>Runtime:</span>
									<h3 id="movie-runtime">
										{movie.runtime}
										min
									</h3>
								</SideStat>

								{movie.budget !== 0 && (
									<SideStat>
										<span>Budget:</span>
										<h3 id="movie-budget">
											${commaNumber(movie.budget)}
										</h3>
									</SideStat>
								)}

								{movie.revenue !== 0 && (
									<SideStat>
										<span>Revenue:</span>
										<h3 id="movie-revenue">
											${commaNumber(movie.revenue)}
										</h3>
									</SideStat>
								)}

								{movie.belongs_to_collection && (
									<RelatedMovies>
										<h4>Part of</h4>
										<h3>{movie.belongs_to_collection.name}</h3>
										<img
											src={
												movie.belongs_to_collection.poster_path
													? `${POSTER_PATH_SMALL}${
															movie.belongs_to_collection.poster_path
													  }`
													: blankPhoto
											}
											alt={movie.belongs_to_collection.name}
										/>
									</RelatedMovies>
								)}

							</SidePanel>
							<MainContent>
								<MainTitle>
									<h1 id="movie-title" style={{ display: 'inline' }}>
										{movie.title}
									</h1>
									<h4 id="movie-tagline">{movie.tagline}</h4>
								</MainTitle>

								<Overview id="movie-overview">{movie.overview}</Overview>

								{trailer && <Trailer id={trailer.key} />}

								<Cast credits={credits} />

							</MainContent>
						</MovieInfo>
					</Fragment>
				)}
				{!loading && movie && movie.status_code === 34 && (
					<Fragment>
						<h2 id="movie-title" style={{ marginTop: '6rem' }}>
							Movie not found!
						</h2>
						<BackButton onClick={history.goBack}>&lt;</BackButton>
					</Fragment>
				)}
			</MovieWrapper>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	favorite: state.favorite,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ favoriteMovie, removeFavorite }
)(withRouter(MovieCard));