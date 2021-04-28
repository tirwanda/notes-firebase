import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addDataToApi, getDataFromApi } from '../../../config/redux/action';
import './index.scss';

class Dashboard extends Component {
	state = {
		title: '',
		date: '',
		content: '',
		userId: '',
	};

	getDataFirebase = () => {};

	componentDidMount() {
		const userData = JSON.parse(localStorage.getItem('userData'));
		this.props.getNotes(userData.uid);
	}

	handleSaveNotes = () => {
		const { title, content } = this.state;
		const { saveNotes } = this.props;
		const userData = JSON.parse(localStorage.getItem('userData'));

		const data = {
			title,
			content,
			date: new Date().getTime(),
			userId: userData.uid,
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
		const { notes } = this.props;
		console.log('notes: ', notes);

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

				{notes.length > 0 ? (
					<Fragment>
						{notes.map((notes) => {
							return (
								<div className="card-content">
									<p className="title">{notes.data.title}</p>
									<p className="date">{notes.data.date}</p>
									<p className="content">
										{notes.data.content}
									</p>
								</div>
							);
						})}
					</Fragment>
				) : null}
			</div>
		);
	}
}

const reduxState = (state) => ({
	userData: state.user,
	notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
	saveNotes: (data) => dispatch(addDataToApi(data)),
	getNotes: (data) => dispatch(getDataFromApi(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
