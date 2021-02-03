
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFavorite} from '../../actions/favoriteActions';

class Favorite extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		setFavorite: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const { history, auth } = this.props;
		if (!auth.isAuthenticated) history.push('/');
		this.props.setFavorite();
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		const { favorite } = this.props;
		return (
			<div>
				<h1>Favorites</h1>
				{isAuthenticated ? (
					<div>
						<ul>
							{favorite &&
								favorite.favorite.map(film => <li key={film.id}>{film.title}</li>)}
						</ul>
					</div>
				) : (
					<div>
						<h2>You must be logged in to view your favourites.</h2>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	favorite: state.favorite,
});

export default connect(
	mapStateToProps,
	{ setFavorite }
)(withRouter(Favorite));
