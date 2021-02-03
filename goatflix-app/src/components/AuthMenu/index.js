import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
	StyledMenu,
	Top,
	TopArrow,
	Bottom,
	ActiveUser,
	AuthLink,
	BottomArrow,
} from './AuthMenu.styled';

export default class AuthMenu extends Component {
	state = {
		open: false,
	};

	onToggle = () =>
		this.setState(prevState => ({
			open: !prevState.open,
		}));

	render() {
		const { open } = this.state;
		const { user, onLogout } = this.props;
		return (
			<StyledMenu>
				<Top onClick={this.onToggle}>
					<TopArrow />
				</Top>
				{open && (
					<Bottom>
						<ActiveUser>Logged in as {user.name}</ActiveUser>
						<AuthLink>
							<Link to="/favorite" onClick={this.onToggle}>
								Favorites
							</Link>
						</AuthLink>
						<AuthLink
							onClick={() => {
								onLogout();
								this.onToggle();
							}}
						>
							Logout
						</AuthLink>
						<BottomArrow />
					</Bottom>
				)}
			</StyledMenu>
		);
	}
}