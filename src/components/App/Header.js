import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
  render() {
    return <div className='header'>
      <Link to='/' className='title'><img src="/dot.png"/><span>Reminders</span></Link>
      <Link to='/reminder' className='btn'>Add Reminder</Link>
    </div>
  }
}

export default Header
