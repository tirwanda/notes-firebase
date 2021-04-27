import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDataToApi } from '../../../config/redux/action';
import './index.scss';

class Dashboard extends Component {
	state = {
		title: '',
		date: '',
		content: '',
		userId: '',
	};

	handleSaveNotes = () => {
		const { title, content } = this.state;
		const { saveNotes } = this.props;

		const data = {
			title,
			content,
			date: new Date().getTime(),
			userId: this.props.userData.uid,
		};

		saveNotes(data);
		console.log(data);
	};

	onInputChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	render() {
		return (
			<div className="container">
				<div className="input-form">
					<input
						id="title"
						className="input-title"
						placeholder="Title"
						type="text"
						onChange={this.onInputChange}
					/>
					<textarea
						id="content"
						className="input-content"
						placeholder="Description"
						type="text"
						onChange={this.onInputChange}
					/>
					<button className="save-btn" onClick={this.handleSaveNotes}>
						Save
					</button>
				</div>
				<hr />

				<div className="card-content">
					<p className="title">{this.state.title}</p>
					<p className="date">{this.state.date}</p>
					<p className="content">{this.state.content}</p>
				</div>
			</div>
		);
	}
}

const reduxState = (state) => ({
	userData: state.user,
});

const reduxDispatch = (dispatch) => ({
	saveNotes: (data) => dispatch(addDataToApi(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
