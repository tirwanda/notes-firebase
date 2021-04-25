import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUserApi } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';
import './index.scss';

class Register extends Component {
	state = {
		email: '',
		password: '',
		isLoading: false,
	};

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleRegisterSubmit = () => {
		this.props.registerApi(this.state);
		this.setState({
			email: '',
			password: '',
		});
	};

	render() {
		return (
			<div className="auth-container">
				<div className="auth-card">
					<p className="auth-title">Register Page</p>
					<input
						id="email"
						className="input"
						type="text"
						placeholder="Email"
						onChange={this.handleChangeText}
						value={this.state.email}
					/>
					<input
						id="password"
						className="input"
						type="password"
						placeholder="Password"
						onChange={this.handleChangeText}
						value={this.state.password}
					/>
					<Button
						onClick={this.handleRegisterSubmit}
						title={Register}
						isLoading={this.props.isLoading}
					/>
				</div>
			</div>
		);
	}
}

const reduxState = (state) => ({
	isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
	registerApi: (data) => dispatch(registerUserApi(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
