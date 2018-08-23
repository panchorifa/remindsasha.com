import dateFns from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

class CurrentDate extends React.Component {

  render() {
    const {selectedDate} = this.props
    const {year, day} = this.props.match.params
    const dateFmt = !year || day ? 'dddd, MMMM D, YYYY' : 'MMMM YYYY'
    const date = dateFns.format(selectedDate, dateFmt)

    return (
      <div className="current-date">{date}</div>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default withRouter(connect(mapStateToProps)(CurrentDate))
