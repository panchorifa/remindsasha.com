import React, {Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import "./Header.scss"

class Header extends Component {
  render() {
    const {name} = this.props
    return (
      <div className="app-heade">
        <div className="header content">
          <div className="logo">
            <Link to="/">
              <div className="icon">access_alarm</div>
              <span>Reminders</span>
            </Link>
          </div>
          <div className="hi">
            <Link to="/profile">Hi, {name}</Link>
          </div>
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

export default connect(mapStateToProps)(Header)
