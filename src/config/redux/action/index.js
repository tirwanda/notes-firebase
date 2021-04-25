import firebase from '../../firebase';

export const actionUserName = () => {
	return (dispatch) => {
		setTimeout(() => {
			return dispatch({ type: 'CHANGE_USER', value: 'Tirwanda' });
		}, 2000);
	};
};

export const registerUserApi = (data) => (dispatch) => {
	dispatch({ type: 'CHANGE_LOADING', value: true });
	return firebase
		.auth()
		.createUserWithEmailAndPassword(data.email, data.password)
		.then((res) => {
			// Signed in
			console.log('Succses: ', res);
			dispatch({ type: 'CHANGE_LOADING', value: false });
			// ...
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode, errorMessage);
			dispatch({ type: 'CHANGE_LOADING', value: false });
		});
};

export const loginApi = (data) => (dispatch) => {
	dispatch({ type: 'CHANGE_LOADING', value: true });
	return firebase
		.auth()
		.signInWithEmailAndPassword(data.email, data.password)
		.then((res) => {
			console.log('Success: ', res);
			dispatch({ type: 'CHANGE_LOADING', value: false });
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode, errorMessage);
			dispatch({ type: 'CHANGE_LOADING', value: false });
		});
};
