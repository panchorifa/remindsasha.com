import dateFns from 'date-fns'
import React, { Component } from 'react'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../actions'

class CalendarMonth extends Component {
  componentWillMount() {
    const { year, month } = this.props.match.params
    this.props.loadMonthDate(year, month)
  }

  componentDidUpdate() {
    const { selectedDate, loadMonthDate } = this.props
    const { year, month } = this.props.match.params

    if(selectedDate && year) {
      if(!dateFns.isSameMonth(selectedDate, new Date(year, month-1))) {
        loadMonthDate(year, month)
      }
    } else if(selectedDate && !year) {
      const today = new Date()
      if(!dateFns.isSameMonth(selectedDate, today)){
        loadMonthDate(dateFns.getYear(today), dateFns.getMonth(today)+1)
      }
    }
  }

  render() {
    return (
      <div className="calendar">
        <Header/>
        <Days/>
        <Cells/>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default withRouter(connect(mapStateToProps, actions)(CalendarMonth))
