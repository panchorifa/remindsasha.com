import {format} from 'date-fns'
import React from 'react'
import './Reminder.scss'

class Reminder extends React.Component {
  render() {
    const {color, text, date}  = this.props.settings
    const {mode} = this.props
    const fmt = mode === 'month' ? 'M/D/YY h:mm a' : 'h:mm a'
    const time = format(date, fmt)
    return (
      <div className="reminder">
        <div className="color" style={{backgroundColor: color}}/>
        <div className="content">
          <div className="title">
            <div className="icon" style={{color: color}}>access_alarm</div>
            <div className="time" style={{color: color}}>{time}</div>
          </div>
          <div className="text">{text}</div>
        </div>
      </div>
    )
  }
}

export default Reminder
