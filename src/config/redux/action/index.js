export const actionUserName = () => {
	return (dispatch) => {
		setTimeout(() => {
			return dispatch({ type: 'CHANGE_USER', value: 'Tirwanda' });
		}, 2000);
	};
};
