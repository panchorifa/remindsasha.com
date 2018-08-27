import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Hi from './Hi'
import './Header.scss'

class Header extends Component {
  render() {
    return <div className='header content'>
      <Hi/>
      <div>
        <Link to='/' className='title'>
          <div className='icon'>access_alarm</div><span>Reminders</span>
        </Link>
      </div>
    </div>
  }
}

export default Header
