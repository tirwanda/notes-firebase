import React from 'react';

const Button = ({ title, onClick, isLoading }) => {
	if (isLoading) {
		return <button className="btn disable">Loading...</button>;
	}

	return (
		<button className="btn" onClick={onClick}>
			{title}
		</button>
	);
};

export default Button;
