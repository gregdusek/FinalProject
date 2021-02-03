import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';
import FormGroup from '../Form/FormGroup';
import StyledButton from '../Form/Button.styled.js';
import { Subtitle } from '../Form/Form.styled';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {},
	};

	static propTypes = {
		registerUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
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
		const { name, email, password, password2 } = this.state;
		const newUser = {
			name,
			email,
			password,
			password2,
		};
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { name, email, password, password2, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Register</h1>
				<Subtitle>
					<Link to="/login">Already registered?</Link>
				</Subtitle>
				<FormGroup
					name="name"
					holderName="Name"
					value={name}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="email"
					holderName="Email"
					type="email"
					value={email}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="password"
					holderName="Password"
					type="password"
					value={password}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="password2"
					holderName="Confirm Password"
					type="password"
					value={password2}
					onChange={this.handleChange}
					errors={password2}
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
	{ registerUser }
)(withRouter(Register));