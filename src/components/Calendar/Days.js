import {format, addDays, startOfWeek} from "date-fns"
import React from "react"
import {connect} from "react-redux"

const Day = ({label, idx}) => (
  <div className="col col-center day" key={`day-${idx}`}>
    {label}
  </div>
)

const dayLabel = (startDate, idx) => format(addDays(startDate, idx), "dddd")

const Days = ({startDate}) => {
  const days = []
  for (let i = 0; i < 7; i++) {
    days.push(<Day label={dayLabel(startDate, i)} idx={i} key={i}/>)
  }
  return <div className="days row">{days}</div>
}

class WeekDays extends React.Component {
  render() {
    const { selectedDate } = this.props
    const startDate =startOfWeek(selectedDate)
    return <Days startDate={startDate}/>
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps)(WeekDays)
