import dateFns from 'date-fns'
import {addDays, isSameMonth, isSameDay, parse, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns'
import React from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import './Cells.scss'

const CellDay = ({mode, day, today, monthStart, selectedDate, selectDay, colors}) => {
  const cloneDay = day
  const formattedDate = format(day, 'D')
  const sameDay = isSameDay(day, today)
  const selected = isSameDay(day, selectedDate)
  const clazz = !isSameMonth(day, monthStart)
        ? 'disabled' : (selected && mode === 'day') ? 'selected' : ''

  const bubbles = colors.map(color =>
    <div key={color} className="bubble" style={{backgroundColor: color, opacity: selected ? 1 : .2}}></div>
  )
  return   <div
      className={`col cell ${clazz}`}
      key={day}
      onClick={() => selectDay(parse(cloneDay))}
    >
      <span className={sameDay ? 'today' : 'number'}>{formattedDate}</span>
      <span className='bg'>{formattedDate}</span>
      <div className="bubbles">
        {bubbles}
      </div>
    </div>
}

class Cells extends React.Component {

  componentDidUpdate(prevProps) {
    const {selectedDate, fetchMonthBubbles} = this.props
    if(!isSameMonth(prevProps.selectedDate, selectedDate)) {
      fetchMonthBubbles(format(selectedDate))
    }
  }

  selectDay(date) {
    const day = dateFns.format(date, '/YYYY/M/D')
    this.props.history.push(day)
    const { selectedDate, loadDayDate } = this.props
    if(dateFns.isSameDay(selectedDate, day)) {
      loadDayDate(date)
    }
  }

  render() {
    const { selectedDate, monthColors, mode } = this.props
    const monthStart = startOfMonth(selectedDate)
    const rows = []
    let day = startOfWeek(monthStart)
    let days = []
    const today=new Date()
    while (day <= endOfWeek(endOfMonth(monthStart))) {
      for (let i = 0; i < 7; i++) {
        const dayColors = monthColors[format(day, 'D')] || []
        days.push(
          <CellDay mode={mode}
                key={i} day={day}
                colors={dayColors}
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
    mode: store.mode,
    selectedDate: store.selectedDate,
    monthColors: store.monthColors
  }
}

export default withRouter(connect(mapStateToProps, actions)(Cells))
