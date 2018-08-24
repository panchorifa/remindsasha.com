import React, { Component } from 'react'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import './Calendar.scss'

class CalendarMonth extends Component {
  render() {
    return (
      <div className="calendar">
        <Header/>
        <Days/>
        <Cells/>
      </div>
    )
  }
}

export default CalendarMonth
