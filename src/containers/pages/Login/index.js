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

	handleLoginSubmit = async () => {
		const res = await this.props.loginApi(this.state).catch((err) => err);
		const { history } = this.props;

		if (res) {
			console.log('Login is Success');
			this.setState({
				email: '',
				password: '',
			});
			console.log(res);
			localStorage.setItem('userData', JSON.stringify(res));
			history.push('/');
		} else {
			console.log('Login Failed');
		}
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
