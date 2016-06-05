import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux/modules/quiz'
import ModalWindow from 'components/ModalWindow'
import QuizForm from 'containers/QuizForm'
import QuizListItem from 'components/QuizListItem'
import SearchBar from 'components/SearchBar'


// Responsible for selecting the quiz based on the current editing id
const selectQuiz = (quizzes, id) => {
	if (!id) return {}
	return quizzes.find((quiz) => quiz.id === id)
}

// Added selectedQuiz which takes quizzes and the current editid and pulls out the quiz from the list
const mapStateToProps = (state) => ({
	quizzes: state.quiz.quizzes,
	showAll: state.quiz.showAll,
	isRequesting: state.quiz.requesting,
	showModal: state.quiz.showModal,
	selectedQuiz: selectQuiz(state.quiz.quizzes, state.quiz.editId)
})

export class QuizContainer extends React.Component {
	// Added showEditQuizModal to show the modal
	// Added selectedQuiz to hold the data for the quiz
	static propTypes = {
		quizzes: PropTypes.array.isRequired,
		getQuizzes: PropTypes.func.isRequired,
		isRequesting: PropTypes.bool.isRequired,
		showModal: PropTypes.bool.isRequired,
		hideModal: PropTypes.func.isRequired,
		showNewQuizModal: PropTypes.func.isRequired,
		saveQuiz: PropTypes.func.isRequired,
		showEditQuizModal: PropTypes.func.isRequired,
		deleteQuiz: PropTypes.func.isRequired,
		selectedQuiz: PropTypes.object,
		onCheck: PropTypes.func,
		onClick: PropTypes.func,
		setCheckValue: PropTypes.func
	};

	componentWillMount () {
		if (this.props.quizzes.length === 0) {
			this.props.getQuizzes()
		}
	}

	render () {
		/* Added QuizListItem here instead of the plain div that was here. Also had it call showEditQuizModal */
		const quizzes = this.props.quizzes.map((quiz) => {
			return (<QuizListItem key={quiz.id} lastName={quiz.lastName} firstName={quiz.firstName} email={quiz.email}
				onClick={this.props.showEditQuizModal} onCheck={this.props.setCheckValue} {...quiz} />)
		})
		let content = (<div>Requesting...</div>)
		if (!this.props.isRequesting) {
			if (this.props.quizzes.length > 0) {
				content = (
					<div>
						{quizzes}
					</div>
				)
			} else {
				<div>
					{content = 'No clients found'}
				</div>
			}
		}
		return (
			<div className='container'>
				<button className='btn btn-success' onClick={this.props.showNewQuizModal}>Add New Client</button>
				<div className='row'>
					<div className='col-md-12'>
						<div className='col-md-2'>
							<strong> Name </strong>
						</div>
						<div className='col-md-1'>
							Received
						</div>
						<div className='col-md-1'>
							Completed
						</div>
						<div className='col-md-1'>
							Scanned
						</div>
						<div className='col-md-1'>
							Printed
						</div>
						<div className='col-md-1'>
							Signed
						</div>
						<div className='col-md-1'>
							E-filed
						</div>
						<div className='col-md-1'>
							Fed Ack
						</div>
						<div className='col-md-1'>
							State Ack
						</div>
						<div className='col-md-1'>
							Paid
						</div>
						<div className='col-md-1'>
							Amount
						</div>
					</div>
				</div>
				{content}
				<ModalWindow title='Client' show={this.props.showModal} onHide={this.props.hideModal}>
					<QuizForm
						initialValues={this.props.selectedQuiz} onDelete={this.props.deleteQuiz} onSubmit={this.props.saveQuiz} />
				</ModalWindow>
			</div>
		)
	}
}
export default connect(mapStateToProps, {...actions})(QuizContainer)
