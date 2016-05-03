import {createValidator, required} from 'redux/utils/validation'
// createValidator is a helper function that will create an easy validation for us
// We can set one or more validations here by using an array
// We can write new custom validators and add them in the redux/utils/validation module
// or we can use the assortment that we have
// This particular validator just makes name a required field
const quizFormValidation = createValidator({
  lastName: required,
  firstName: required,
  email: required
})

export default quizFormValidation
