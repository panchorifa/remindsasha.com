import dateFns from 'date-fns'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import CalendarMonth from '../CalendarMonth'
import CalendarDay from '../CalendarDay'

class Calendar extends Component {
  componentWillMount() {
    const { year, month, day } = this.props.match.params
    if(day) {
      this.props.loadDayDate(new Date(year, month, day))
    } else {
      this.props.loadMonthDate(year, month)
    }
  }

  componentDidUpdate() {
    const { mode, selectedDate, loadMonthDate, loadDayDate } = this.props
    const { year, month, day } = this.props.match.params

    if(selectedDate && year) {
      if(day) {
        const date = new Date(year, month-1, day)
        if(!dateFns.isSameDay(selectedDate, date)) {
          loadDayDate(date)
        }
      } else {
        if(mode !== 'month' || !dateFns.isSameMonth(selectedDate, new Date(year, month-1))) {
          loadMonthDate(year, month)
        }
      }
    } else if(selectedDate && !year) {
      const today = new Date()
      if(mode!=='day' || !dateFns.isSameDay(selectedDate, today)) {
        loadDayDate(today)
      }
    }
  }

  render() {
    return (
      <div className="main">
        <div className="reminders">
          <CalendarDay/>
        </div>
        <div className="month">
          <CalendarMonth/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    mode: store.mode,
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Calendar)
// export default Calendar
