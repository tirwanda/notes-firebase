import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actionUserName } from '../../../config/redux/action';

class Login extends Component {
	changeuser = () => {
		this.props.changeUserName();
	};

	render() {
		return (
			<div>
				<p>Login Page {this.props.userName}</p>
				<button>Go to Register</button>
				<button onClick={this.changeuser}>Change User Name</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		popupProps: state.popup,
		userName: state.user,
	};
};

const reduxDispatch = (dispatch) => ({
	changeUserName: () => dispatch(actionUserName()),
});

export default connect(mapStateToProps, reduxDispatch)(Login);
