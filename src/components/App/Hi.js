import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Hi.scss'

class Hi extends React.Component {
  render() {
    const {name} = this.props
    return (
      <div className="top">
        <div className="welcome">
          <Link to="/profile">Hi, {name}</Link>
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

export default connect(mapStateToProps)(Hi)
