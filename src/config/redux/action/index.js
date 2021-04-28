import firebase, { database } from '../../firebase';

export const actionUserName = () => {
	return (dispatch) => {
		setTimeout(() => {
			return dispatch({ type: 'CHANGE_USER', value: 'Tirwanda' });
		}, 2000);
	};
};

export const registerUserApi = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: 'CHANGE_LOADING', value: true });
		firebase
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((res) => {
				// Signed in
				console.log('Succses: ', res);
				dispatch({ type: 'CHANGE_LOADING', value: false });
				resolve(true);
				// ...
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log(errorCode, errorMessage);
				dispatch({ type: 'CHANGE_LOADING', value: false });
				reject(false);
			});
	});
};

export const loginApi = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: 'CHANGE_LOADING', value: true });
		firebase
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then((res) => {
				const dataUser = {
					email: res.user.email,
					uid: res.user.uid,
					emailVerified: res.user.emailVerified,
					refreshToken: res.user.refreshToken,
				};
				dispatch({ type: 'CHANGE_LOADING', value: false });
				dispatch({ type: 'CHANGE_ISLOGIN', value: true });
				dispatch({ type: 'CHANGE_USER', value: dataUser });
				resolve(dataUser);
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log(errorCode, errorMessage);
				dispatch({ type: 'CHANGE_LOADING', value: false });
				dispatch({ type: 'CHANGE_ISLOGIN', value: false });
				reject(false);
			});
	});
};

export const addDataToApi = (data) => (dispatch) => {
	database.ref('notes/' + data.userId).push({
		title: data.title,
		date: data.date,
		content: data.content,
	});
};

export const getDataFromApi = (userId) => (dispatch) => {
	const urlNotes = firebase.database().ref('notes/' + userId);
	return new Promise((resolve, reject) => {
		urlNotes.on('value', (snapshot) => {
			const rawData = snapshot.val();
			const data = [];
			Object.keys(snapshot.val()).forEach((key) => {
				data.push({
					id: key,
					data: snapshot.val()[key],
				});
			});
			dispatch({ type: 'GET_NOTES', value: data });
			// updateStarCount(postElement, data);
			console.log('Get Data: ', rawData);
			resolve(snapshot.val());
		});
	});
};
