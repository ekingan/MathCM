import React, { PropTypes } from 'react'
import CheckBox from './CheckBox'
import Cash from './Cash'
// Moved out the QuizListItem stuff out of the QuizList and set it up to call onClick with the id
export default function QuizListItem (props) {
  const handleClick = (event) => {
    props.onClick(props.id)
  }
  const handleCheck = (name, value) => {
    props.onCheck(name, props.id, value)
  }
  return (
    <div style={{cursor: 'pointer'}}
      className='row'>
      <div className='col-md-12'>
        <div className='col-md-2' onClick={handleClick}>
          {props.lastName}, {props.firstName}
        </div>
        <div className='col-md-1'>
          <CheckBox name='received' initialValue={props.received !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='completed' initialValue={props.completed !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='scanned' initialValue={props.scanned !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='printed' initialValue={props.printed !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='signed' initialValue={props.signed !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='efiled' initialValue={props.efiled !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='fedAccepted' initialValue={props.fedAccepted !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='stateAccepted' initialValue={props.stateAccepted !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <CheckBox name='paid' initialValue={props.paid !== null} onClick={handleCheck} />
        </div>
        <div className='col-md-1'>
          <Cash name='amount' initialValue={props.amount} onChange={handleCheck}/>
        </div>
      </div>
    </div>
    )
}
QuizListItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}
