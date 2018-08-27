import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import './Profile.scss'

class Profile extends Component {
  handleKeyPress(fn, event) {
    if (event.key === 'Enter') {
      this.props.history.push('/')
      fn(event.target.value)
    }
  }

  render() {
    const {name, changeName} = this.props
    return (
      <div className="profile">
        <div className="panel">
          <div className="title">Not {name}?</div>
          <input type="text" placeholder="Enter your name"
               onKeyPress={(e) => this.handleKeyPress(changeName, e)}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    name: store.name
  }
}

export default connect(mapStateToProps, actions)(Profile)
