import { CALL_API } from 'redux/middleware/api'
// Constants
export const QUIZ_REQUEST = 'QUIZ_REQUEST'
export const QUIZ_SUCCESS = 'QUIZ_SUCCESS'
export const QUIZ_FAILED = 'QUIZ_FAILED'
export const SET_SHOWALL = 'SET_SHOWALL'
export const SHOW_NEW_QUIZ = 'SHOW_NEW_QUIZ'
export const HIDE_QUIZ = 'HIDE_QUIZ'
export const SAVE_QUIZ_REQUEST = 'SAVE_QUIZ_REQUEST'
export const SAVE_QUIZ_SUCCESS = 'SAVE_QUIZ_SUCCESS'
export const SAVE_QUIZ_ERROR = 'SAVE_QUIZ_ERROR'
export const SHOW_EDIT_QUIZ = 'SHOW_EDIT_QUIZ'
export const DELETE_QUIZ = 'DELETE_QUIZ'
export const DELETE_QUIZ_SUCCESS = 'DELETE_QUIZ_SUCCESS'
export const DELETE_QUIZ_FAILED = 'DELETE_QUIZ_FAILED'
export const SET_CHECK_REQUEST = 'SET_CHECK_REQUEST'
export const CHECK_SUCCESS = 'CHECK_SUCCESS'
export const CHECK_FAILED = 'CHECK_FAILED'
// Actions
const setShowAll = (value) => {
  return {
    type: SET_SHOWALL,
    payload: value
  }
}

const hideModal = () => {
  return {
    type: HIDE_QUIZ
  }
}

const showEditQuizModal = (id) => {
  return {
    type: SHOW_EDIT_QUIZ,
    payload: id
  }
}

const showNewQuizModal = () => {
  return {
    type: SHOW_NEW_QUIZ
  }
}

const saveQuiz = (quiz) => {
  return {
    [CALL_API]: {
      types: [ SAVE_QUIZ_REQUEST, SAVE_QUIZ_SUCCESS, SAVE_QUIZ_ERROR ],
      endpoint: '/api/secured/quizzes/',
      method: 'POST',
      body: quiz
    },
    quiz
  }
}

const getQuizzes = () => {
  return {
    [CALL_API]: {
      types: [ QUIZ_REQUEST, QUIZ_SUCCESS, QUIZ_FAILED ],
      endpoint: '/api/secured/quizzes/',
      method: 'GET'
    }
  }
}
const deleteQuiz = (id) => {
  return {
    [CALL_API]: {
      types: [ DELETE_QUIZ, DELETE_QUIZ_SUCCESS, DELETE_QUIZ_FAILED ],
      endpoint: `/api/secured/quizzes/${id}`,
      method: 'DELETE'
    },
    id
  }
}

const setCheckValue = (name, id, value) => {
  const obj = {name, value}
  return {
    [CALL_API]: {
      types: [ SET_CHECK_REQUEST, CHECK_SUCCESS, CHECK_FAILED ],
      endpoint: `/api/secured/quizzes/${id}`,
      method: 'PUT',
      body: obj
    },
    id
  }
}

export const actions = {
  getQuizzes,
  setShowAll,
  hideModal,
  showNewQuizModal,
  saveQuiz,
  showEditQuizModal,
  deleteQuiz,
  setCheckValue
}

const initialState = {showAll: false, showModal: false, requesting: false, quizzes: []}
export default function quizReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_NEW_QUIZ:
      return {...state, showModal: true, editId: null}
    case SHOW_EDIT_QUIZ:
      return {...state, showModal: true, editId: action.payload}
    case HIDE_QUIZ:
      return {...state, showModal: false}
    case SAVE_QUIZ_SUCCESS:
      const newQuiz = {...action.quiz, id: action.payload.id, received: null, completed: null, scanned: null, printed: null, signed: null, efiled: null, fedAccepted: null, stateAccepted: null, paid: null}
      const quizzes = [...state.quizzes.filter((quiz) => quiz.id !== action.payload.id), newQuiz]
      return {...state, quizzes, showModal: false}
    case QUIZ_REQUEST:
      return {...state, requesting: true}
    case QUIZ_SUCCESS:
      return {...state, requesting: false, quizzes: action.payload.quizzes}
    case QUIZ_FAILED:
      return {...state, requesting: false}
    case DELETE_QUIZ_SUCCESS:
      const deleteQuizzes = [...state.quizzes.filter((quiz) => quiz.id !== action.id)]
      return {...state, quizzes: deleteQuizzes, showModal: false}
    case DELETE_QUIZ_FAILED:
      return {...state, quizzes, showModal: false, error: true}
    case SET_SHOWALL:
      return {...state, showAll: action.payload}
    case SET_CHECK_REQUEST:
      return {...state, requestingCheck: true}
    case CHECK_SUCCESS:
      return {...state, requestingCheck: true, error: false}
    case CHECK_FAILED:
      return {...state, requestingCheck: false, error: true}
    default:
      return state
  }
}
