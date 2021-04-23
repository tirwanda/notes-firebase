import React, { Component } from 'react';
import firebase from '../../../config/firebase';
import './index.scss';

class Register extends Component {
	state = {
		email: '',
		password: '',
	};

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleRegisterSubmit = () => {
		const { email, password } = this.state;

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				console.log('Succses: ', user);
				// ...
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log(errorCode, errorMessage);
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
					/>
					<input
						id="password"
						className="input"
						type="password"
						placeholder="Password"
						onChange={this.handleChangeText}
					/>
					<button className="btn" onClick={this.handleRegisterSubmit}>
						Register
					</button>
				</div>
				{/* <button>Go to Dashboard</button> */}
			</div>
		);
	}
}

export default Register;
