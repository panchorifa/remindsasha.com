import {format, isSameDay, isSameMonth, parse} from 'date-fns'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../actions'
import './CellDay.scss'

class CellDay extends Component {

  render() {
      const {mode, day, today, monthStart,
        holiday, selectedDate, selectDay, colors} = this.props
      const cloneDay = day
      const formattedDate = format(day, 'D')
      const sameDay = isSameDay(day, today)
      const selected = isSameDay(day, selectedDate)
      const clazz = !isSameMonth(day, monthStart)
            ? 'disabled' : (selected && mode === 'day') ? 'selected' : ''

      const bubbles = colors.map((color, idx) =>
        <div key={idx} className="bubble"
          style={{backgroundColor: color, opacity: 1}}></div>
      )
      const holidayTitle = holiday ? holiday.title : ''

      return   (
        <div
          className={`col cell ${clazz}`}
          key={day}
          onClick={() => selectDay(parse(cloneDay))}
        >
          <span className={sameDay ? 'today' : 'number'}>{formattedDate}</span>
          <span className={holiday ? 'holiday' : 'none'}>
            {holidayTitle}
          </span>

          <span className='bg'>{formattedDate}</span>
          <div className="bubbles">
            {bubbles}
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

export default connect(mapStateToProps, actions)(CellDay)
