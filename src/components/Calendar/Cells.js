import {addDays, isSameMonth, isSameDay, parse, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

const CellDay = ({day, monthStart, selectedDate, selectDate}) => {
  const cloneDay = day
  const formattedDate = format(day, 'D')
  return   <div
      className={`col cell ${
        !isSameMonth(day, monthStart)
          ? 'disabled'
          : isSameDay(day, selectedDate) ? 'selected' : ''
      }`}
      key={day}
      onClick={() => selectDate(parse(cloneDay))}
    >
      <span className='number'>{formattedDate}</span>
      <span className='bg'>{formattedDate}</span>
    </div>
}

class Cells extends React.Component {
  render() {
    const { currentMonth, selectedDate, selectDate } = this.props
    const monthStart = startOfMonth(currentMonth)

    const rows = []
    let day = startOfWeek(monthStart)
    let days = []
    while (day <= endOfWeek(endOfMonth(monthStart))) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <CellDay key={i} day={day} monthStart={monthStart} selectedDate={selectedDate} selectDate={selectDate}/>
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
    currentMonth: store.currentMonth,
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Cells)
