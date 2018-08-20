import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
  render() {
    return <div className='header'>
      <h3>Reminders</h3>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/reminder'>Add Reminder</Link></li>
      </ul>
    </div>
  }
}

export default Header
