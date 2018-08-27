import dateFns from 'date-fns'
import {addDays, isSameMonth, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns'
import React from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import CellDay from './CellDay'
import './Cells.scss'

class Cells extends React.Component {
  state = {
    fetching: false
  }

  componentDidUpdate(prevProps) {
    const {selectedDate, fetchMonthBubbles} = this.props
    if(!isSameMonth(prevProps.selectedDate, selectedDate)) {
      this.setState({fetching: true})
      fetchMonthBubbles(format(selectedDate)).then(() => {
        this.setState({fetching: false})
      })
    }
  }

  selectDay = (date) => {
    const day = dateFns.format(date, '/YYYY/M/D')
    this.props.history.push(day)
    const { selectedDate, loadDayDate } = this.props
    if(dateFns.isSameDay(selectedDate, day)) {
      loadDayDate(date)
    }
  }

  render() {
    const { selectedDate, monthColors } = this.props
    const monthStart = startOfMonth(selectedDate)
    const rows = []
    let day = startOfWeek(monthStart)
    let days = []
    const today=new Date()
    while (day <= endOfWeek(endOfMonth(monthStart))) {
      for (let i = 0; i < 7; i++) {
        const dayColors = this.state.fetching ? [] : (monthColors[format(day, 'D')] || [])
        days.push(
          <CellDay key={i} day={day}
                colors={dayColors}
                today={today}
                monthStart={monthStart}
                selectDay={this.selectDay}/>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>{days}</div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }
}

const mapStateToProps = store => {
  return {
    mode: store.mode,
    selectedDate: store.selectedDate,
    monthColors: store.monthColors,
    fetching: store.fetchingBubbles || store.fetchingReminders
  }
}

export default withRouter(connect(mapStateToProps, actions)(Cells))
