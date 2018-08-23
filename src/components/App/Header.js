import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Header extends Component {

  render() {
    const {name} = this.props
    return <div className='header'>
      <div className="top">
        <div className="welcome">
          <Link to="/profile">Hi, {name}</Link>
        </div>
      </div>
      <div>
        <Link to='/' className='title'>
          <div className='icon'>access_alarm</div><span>Reminders</span>
        </Link>
        <Link to='/reminder' className='btn'>New Reminder</Link>
      </div>
    </div>
  }
}

const mapStateToProps = store => {
  return {
    name: store.name
  }
}

export default connect(mapStateToProps)(Header)
