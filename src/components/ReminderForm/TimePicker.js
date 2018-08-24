import {format, setHours, setMinutes, getHours, getMinutes} from 'date-fns'
import React, { Component } from 'react'
import InputSlider from 'react-input-slider'
import './TimePicker.scss'

class TimePicker extends Component {
  state = {
    date: new Date()
  }

  changeHours = pos => {
    const date = setHours(this.state.date, pos.x)
    this.setState({date: date})
    console.log(date)
    console.log(pos.x)
  }

  changeMinutes = pos => {
    const date = setMinutes(this.state.date, pos.x)
    this.setState({date: date})
  }

  render() {
    const {date} = this.state
    return (
      <div className="time-picker">
        <div className="showtime">
          <span className="xtime">{format(date, 'HH')}</span>
          <span className="separater">:</span>
          <span className="xtime">{format(date, 'mm')}</span>
        </div>

        <div className="sliders">
          <div className="slider">
          <div className="time-text">Hour</div>
          <InputSlider className="u-slider-time"
              xmin={0} xmax={23} xstep={1} x={getHours(date)}
              onChange={this.changeHours}
          />
          </div>
          <div className="slider">
          <div className="time-text">Minutes</div>
          <InputSlider className="u-slider-time"
              xmin={0} xmax={59} xstep={1} x={getMinutes(date)}
              onChange={this.changeMinutes}
          />
        </div>
        </div>
      </div>
      )
    }
  }

export default TimePicker
