import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import quizFormValidation from './quizFormValidation'
// QuizForm component that will be responsible for capturing the data for a new quiz.
// Redux Form requires that you pass it an array of fields that it should be capturing
// It uses these to generate fields objects complete with event handlers that will map the fields to state
// This can be shown by modifying a field and watching the state change in the redux dev tools
const fields = ['id', 'lastName', 'firstName', 'email']

class QuizForm extends Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  // The fields discussed above are passed in to the fields prop here
  // handleSubmit is another special handler supplied by redux-form
  // handleSubmit will call whatever has been passed in to the "onSubmit" function or a function that you specify
  // handleSubmit has code built in that will check validations before submitting and prevent submission if failure
  // handleSubmit also will automatically pass in a "submitting" = true to this component
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired
  }
  handleDelete () {
    this.props.onDelete(this.props.fields.id.value)
  }
  render () {
    // We are using a destructuring operator to pull the name and isActive field objects out of this.props.fields
    // as well as the handleSubmit, submitting from this.props
    const {fields: {lastName, firstName, email}, handleSubmit, submitting} = this.props

    // sets the name error message if name has been touched and there's an error
    // this is the javascript in-line if
    const lastNameErrorMsg = lastName.touched && lastName.error ? lastName.error : ''
    const firstNameErrorMsg = firstName.touched && firstName.error ? firstName.error : ''
    const emailErrorMsg = email.touched && email.error ? email.error : ''
    return (
      <div className='form-quiz'>
        {/* Remember the handleSubmit is a special function passed in from redux-form
           You can also use handleSubmit(this.someFunction) if you want it to call someFunction
           instead of whatever has been passed to onSubmit */}
        <form onSubmit={handleSubmit} className='form' role='form'>
          <fieldset className='form-group'>
            <label htmlFor='lastName'>Last Name</label> <label className='text-danger'>{lastNameErrorMsg}</label>
            {/* the {...name} tag may look a little confusing here it's passing in all of the properties
               of the name object into the input. This is going to be things like onChange onBlur and value */}
            <input type='text' className='form-control' id='lastName'
              placeholder='Last Name' {...lastName} required=''/>
          </fieldset>
          <fieldset className='form-group'>
            <label htmlFor='firstName'>First Name</label> <label className='text-danger'>{firstNameErrorMsg}</label>
            <input type='text' className='form-control' id='firstName'
              placeholder='First Name' {...firstName} required=''/>
          </fieldset>
          <fieldset className='form-group'>
            <label htmlFor='email'>Email</label> <label className='text-danger'>{emailErrorMsg}</label>
            <input type='text' className='form-control' id='email'
              placeholder='email' {...email} required=''/>
          </fieldset>
          <button type='submit' className='btn btn-primary btn-block' disabled={submitting}>Save
            {submitting ? <span className='loader glyphicon glyphicon-refresh spin'></span>
              : <span></span>}
          </button>
          <button type='button' className='btn btn-danger btn-block' onClick={this.handleDelete} disabled={submitting}>
          Delete
            {submitting ? <span className='loader glyphicon glyphicon-refresh spin'></span>
              : <span></span>}
          </button>
        </form>
      </div>

    )
  }
}
// Like connect reduxForm is a higher order component. It wraps our QuizForm in its own special component
// which implements all the nice validation functions and takes care of triggering state actions
// reduxForm also can utilize the same functionality as connect and will allow you to pass in
// mapStateToProps and mapDispatchToProps
export default reduxForm({
  form: 'quizForm',
  fields,
  validate: quizFormValidation
})(QuizForm)
