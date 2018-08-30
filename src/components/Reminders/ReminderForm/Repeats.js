import React from 'react'
import {connect} from 'react-redux'
import './Repeats.scss'

class Repeats extends React.Component {
  state = {
    active:0
  }
  select = (idx) => {
    this.setState({active: idx})
  }
  render() {
    const {active} = this.state
    const {color} = this.props
    return (
    <ul className="repeats">
      <li className={active === 0 ? 'active': ''} style={{backgroundColor: active === 0 ? color: ''}} onClick={() => this.select(0)}>Does not repeat</li>
      <li className={active === 1 ? 'active': ''} style={{backgroundColor: active === 1 ? color: ''}} onClick={() => this.select(1)}>Repeats Weekly</li>
      <li className={active === 2 ? 'active': ''} style={{backgroundColor: active === 2 ? color: ''}} onClick={() => this.select(2)}>Repeats Monthly</li>
      <li className={active === 3 ? 'active': ''} style={{backgroundColor: active === 3 ? color: ''}} onClick={() => this.select(3)}>Repeats Yearly</li>
    </ul>
    )
  }
}

const mapStateToProps = store => {
  return {
    color: store.color
  }
}

export default connect(mapStateToProps)(Repeats)
