import React, { PropTypes } from 'react'

export default class CheckBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {checked: props.initialValue}
  }
  render () {
    const handleClick = (event) => {
      this.setState({checked: event.target.checked})
      this.props.onClick(this.props.name, event.target.checked)
    }

    return (
      <input type='checkbox' checked={this.state.checked} onClick={handleClick} />
     )
  }

}
CheckBox.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  initialValue: PropTypes.bool
}
