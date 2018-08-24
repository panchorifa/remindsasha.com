import React from 'react'
import './Reminder.scss'

class Reminder extends React.Component {
  render() {
    const {color, text}  = this.props.settings
    return (
      <div className="reminder">
        <div className="color" style={{backgroundColor: color}}/>
        <div className="content">
          <div className="title">
            <div className="icon">access_alarm</div>
            <div className="time">1:30 PM</div>
          </div>
          <div className="text">{text}</div>
        </div>
      </div>
    )
  }
}

export default Reminder
