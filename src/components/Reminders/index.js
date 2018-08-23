import dateFns from 'date-fns'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
// import { Link } from 'react-router-dom'

class Reminders extends Component {
  close() {
    const month = dateFns.format(this.props.selectedDate, '/YYYY/M')
    this.props.history.push(month)
  }

  render() {
    return (
      <div className="reminders">
        <div className="header">
          <a className="icon" onClick={this.close.bind(this)}>close</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default withRouter(connect(mapStateToProps)(Reminders))
