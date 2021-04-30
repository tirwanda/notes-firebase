import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	addDataToApi,
	getDataFromApi,
	updateDataApi,
	deleteDataApi,
} from '../../../config/redux/action';
import './index.scss';

class Dashboard extends Component {
	state = {
		title: '',
		date: '',
		content: '',
		userId: '',
		textButton: 'save',
		noteId: '',
	};

	getDataFirebase = () => {};

	componentDidMount() {
		const userData = JSON.parse(localStorage.getItem('userData'));
		this.props.getNotes(userData.uid);
	}

	handleSaveNotes = () => {
		const { title, content, textButton, noteId } = this.state;
		const { saveNotes, updateNotes } = this.props;
		const userData = JSON.parse(localStorage.getItem('userData'));

		const data = {
			title,
			content,
			date: new Date().getTime(),
			userId: userData.uid,
		};

		if (textButton === 'save') {
			saveNotes(data);
		} else {
			data.noteId = noteId;
			updateNotes(data);
		}
		console.log(data);
	};

	onInputChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	updateNotes = (notes) => {
		console.log(notes);
		this.setState({
			title: notes.data.title,
			content: notes.data.content,
			textButton: 'update',
			noteId: notes.id,
		});
	};

	cancelUpdate = () => {
		this.setState({
			title: '',
			content: '',
			textButton: 'save',
		});
	};

	deleteNotes = (elem, note) => {
		elem.stopPropagation(); // Stop Click parent element
		const userData = JSON.parse(localStorage.getItem('userData'));
		const data = {
			userId: userData.uid,
			noteId: note.id,
		};

		this.props.deleteNotes(data);
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
						value={this.state.title}
						onChange={this.onInputChange}
					/>
					<textarea
						id="content"
						className="input-content"
						placeholder="Description"
						type="text"
						value={this.state.content}
						onChange={this.onInputChange}
					/>

					<div className="action-wrapper">
						{this.state.textButton === 'update' ? (
							<button
								className="save-btn cancel"
								onClick={this.cancelUpdate}
							>
								Cancel
							</button>
						) : null}
						<button
							className="save-btn"
							onClick={this.handleSaveNotes}
						>
							{this.state.textButton}
						</button>
					</div>
				</div>
				<hr />

				{notes.length > 0 ? (
					<Fragment>
						{notes.map((notes, i) => {
							return (
								<div
									key={i}
									className="card-content"
									onClick={() => this.updateNotes(notes)}
								>
									<p className="title">{notes.data.title}</p>
									<p className="date">{notes.data.date}</p>
									<p className="content">
										{notes.data.content}
									</p>
									<div
										className="delete-btn"
										onClick={(elem) =>
											this.deleteNotes(elem, notes)
										}
									>
										X
									</div>
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
	updateNotes: (data) => dispatch(updateDataApi(data)),
	deleteNotes: (data) => dispatch(deleteDataApi(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
