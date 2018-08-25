import {format} from 'date-fns'
import React from 'react'
import './Reminder.scss'

class Reminder extends React.Component {
  render() {
    const {color, text, date}  = this.props.settings
    const time = format(date, 'h:mm a')
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
