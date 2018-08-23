import dateFns from 'date-fns'
import {addDays, isSameMonth, isSameDay, parse, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns'
import React from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import * as actions from '../../actions'

const CellDay = ({day, today, monthStart, selectedDate, selectDay}) => {
  const cloneDay = day
  const formattedDate = format(day, 'D')
  const clazz = !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, today)
                    ? 'selected'
                    : '';
  return   <div
      className={`col cell ${clazz}`}
      key={day}
      onClick={() => selectDay(parse(cloneDay))}
    >
      <span className='number today'>{formattedDate}</span>
      <span className='bg'>{formattedDate}</span>
    </div>
}

class Cells extends React.Component {

  selectDay(date) {
    const day = dateFns.format(date, '/YYYY/M/D')
    this.props.history.push(day)
  }

  render() {
    const { selectedDate } = this.props
    const monthStart = startOfMonth(selectedDate)

    const rows = []
    let day = startOfWeek(monthStart)
    let days = []
    const today=new Date()
    while (day <= endOfWeek(endOfMonth(monthStart))) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <CellDay key={i} day={day}
                today={today}
                monthStart={monthStart}
                selectedDate={selectedDate}
                selectDay={this.selectDay.bind(this)}/>
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
    selectedDate: store.selectedDate
  }
}

export default withRouter(connect(mapStateToProps, actions)(Cells))
