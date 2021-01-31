//Dependency packages
import React, { Component, Fragment } from 'react';
import {Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

//Action dependencies
import {logoutUser} from '../../actions/authActions';
import {resetMoviesList} from '../../actions/listActions';

//Style dependencies
import { StyledNavBar, NavLink, OptionsContainer } from './NavBar.styled.js';
import Logo from '../Logo';
import SearchButton from '../Search';
import UnauthDropdown from '../UnauthMenu';
import AuthDropdown from '../UnauthMenu';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: false,
            prevScrollPosition: 0,
        };
        this.navref = React.createRef();
    }
    
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    componentDidMount = () => {
		window.addEventListener('scroll', _.throttle(this.onScroll, 300));
	};

	componentWillUnmount = () => {
		window.removeEventListener('scroll', _.throttle(this.onScroll, 300));
	};

	onScroll = () => {
		const { sticky, prevScrollPosition } = this.state;
		if (!sticky && window.scrollY > 176 && window.scrollY < prevScrollPosition) {
			this.setState({ sticky: true });
		}
		if (sticky && (window.scrollY < 176 || window.scrollY > prevScrollPosition)) {
			this.setState({ sticky: false });
		}
		this.setState({ prevScrollPosition: window.scrollY });
    };
    
    resetList = () => {};

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const { logoutUser, resetMoviesList, history } = this.props;
        const { sticky } = this.state;
        
        return (
			<StyledNavBar ref={this.navRef} sticky={sticky}>
				<Link to="/">
					<Logo onClick={resetMoviesList} />
				</Link>
				<OptionsContainer>
					<SearchButton />
					{isAuthenticated ? (
						<AuthDropdown user={user} onLogout={() => logoutUser(history)} />
					) : (
						<Fragment>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/register">Register</NavLink>
							<UnauthDropdown />
						</Fragment>
					)}
				</OptionsContainer>
			</StyledNavBar>
		);
	}

}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ logoutUser, resetMoviesList }
)(withRouter(NavBar));