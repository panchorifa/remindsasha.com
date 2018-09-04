import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import './Profile.scss'

class Profile extends Component {
  state = {
    tab: 0
  }
  handleKeyPress(fn, event) {
    if (event.key === 'Enter') {
      this.props.history.push('/')
      fn(event.target.value)
    }
  }

  selectTab = idx => {
    this.setState({tab: idx})
  }

  render() {
    const {name, changeName} = this.props
    const {tab} = this.state
    return (
      <div className="profile">
        <div className="links">
          <ul>
            <li onClick={() => this.selectTab(0)} className={tab === 0 ? 'active' : ''}>Profile</li>
            <li onClick={() => this.selectTab(1)} className={tab === 1 ? 'active' : ''}>Themes</li>
          </ul>
        </div>
        <div className="panel" style={{display: tab === 0 ? 'block' : 'none'}}>
          <div className="title">Not {name}?</div>
          <input type="text" placeholder="Enter your name"
               onKeyPress={(e) => this.handleKeyPress(changeName, e)}/>
        </div>
        <div className="themes" style={{display: tab === 1 ? 'block' : 'none'}}>
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
