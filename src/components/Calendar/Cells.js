import {addDays, isSameMonth, isSameDay, parse, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

const CellDay = ({day, monthStart, selectedDate, selectDate}) => {
  const cloneDay = day
  // console.log(day)
  // console.log(isSameDay(day, selectedDate))
  // console.log('--------------------');
  const formattedDate = format(day, 'D')
  const clazz = !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
                    ? 'selected'
                    : '';
  return   <div
      className={`col cell ${clazz}`}
      key={day}
      onClick={() => selectDate(parse(cloneDay))}
    >
      <span className='number today'>{formattedDate}</span>
      <span className='bg'>{formattedDate}</span>
    </div>
}

class Cells extends React.Component {
  render() {
    const { selectedDate, selectDate } = this.props
    const monthStart = startOfMonth(selectedDate)

    const rows = []
    let day = startOfWeek(monthStart)
    let days = []
    while (day <= endOfWeek(endOfMonth(monthStart))) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <CellDay key={i} day={day}
                monthStart={monthStart}
                selectedDate={selectedDate}
                selectDate={selectDate}/>
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

// export default connect(actions)(Cells)
const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Cells)
