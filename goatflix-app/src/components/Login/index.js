import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import FormGroup from '../Form/FormGroup';
import StyledButton from '../Form/Button.styled';
import { Subtitle } from '../Form/Form.styled';

class Login extends Component {
	static propTypes = {
		loginUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
	};

	state = {
		email: '',
		password: '',
		errors: {},
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/favorite');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		const newUser = {
			email,
			password,
		};
		this.props.loginUser(newUser, this.props.history);
	};

	render() {
		const { email, password, errors } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Login</h1>
				<Subtitle>
					<Link to="/register">Not registered?</Link>
				</Subtitle>
				<FormGroup
					name="email"
					holderName="Email"
					value={email}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="password"
					holderName="Password"
					value={password}
					type="password"
					onChange={this.handleChange}
					errors={errors}
				/>
				<StyledButton type="submit">Submit</StyledButton>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(withRouter(Login));