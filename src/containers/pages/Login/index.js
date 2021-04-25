import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginApi } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';

class Login extends Component {
	state = {
		email: '',
		password: '',
	};

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleLoginSubmit = () => {
		this.props.loginApi(this.state);
		this.setState({
			email: '',
			password: '',
		});
	};

	render() {
		return (
			<div className="auth-container">
				<div className="auth-card">
					<p className="auth-title">Login Form</p>
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
						onClick={this.handleLoginSubmit}
						title="Login"
						isLoading={this.props.isLoading}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading,
	};
};

const reduxDispatch = (dispatch) => ({
	loginApi: (data) => dispatch(loginApi(data)),
});

export default connect(mapStateToProps, reduxDispatch)(Login);
