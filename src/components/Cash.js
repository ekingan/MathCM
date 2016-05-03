import React, { PropTypes } from 'react'

export default class Cash extends React.Component {
  constructor (props) {
    super(props)

  	this.state = {cost : props.initialValue};
  }

  render () {
    const handleChange = (event) => {
      this.props.onChange(this.props.name, event.target.value)
    }
    return (
  	 <div>
	    <input 
	    	type='text'
	    	value= {this.state.cost}
	    	onChange={event => this.setState({ cost: event.target.value})}
        onBlur={handleChange} />
    </div>

    )
	}

}
Cash.propTypes = {
  onChange: PropTypes.func,
  cost: PropTypes.float,
  value: PropTypes.string
}
  

