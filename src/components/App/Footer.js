import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.scss'

class Footer extends React.Component {
  render() {
    return (
      <div className="footer content">
        &copy; Sasha Corp, 2018
        <Link to="/suggestions">Got suggestions?</Link>
      </div>
    )
  }
}

export default Footer
