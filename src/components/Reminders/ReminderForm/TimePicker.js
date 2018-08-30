import {format, getHours, getMinutes} from 'date-fns'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import InputSlider from 'react-input-slider'
import './TimePicker.scss'

class TimePicker extends Component {

  render() {
    const {date, color, onChangeHours, onChangeMinutes} = this.props
    return (
      <div className="time-picker">
        <div className="showtime">
          <span className="xtime" style={{backgroundColor: color}}>{format(date, 'HH')}</span>
          <span className="separater" style={{color: color}}>:</span>
          <span className="xtime" style={{backgroundColor: color}}>{format(date, 'mm')}</span>
        </div>

        <div className="sliders">
          <div className="slider">
          <div className="time-text" style={{color: color}}>Hour</div>
          <style jsx>{`
            .u-slider-time .value {
              background-color: ${color};
            }
            .u-slider-time .handle:after {
              border: 3px solid ${color};
            }
          `}</style>

          <InputSlider className="u-slider-time"
              xmin={0} xmax={23} xstep={1} x={getHours(date)}
              onChange={onChangeHours}
          />
          </div>
          <div className="slider">
          <div className="time-text" style={{color: color}}>Minutes</div>
          <InputSlider className="u-slider-time"
              xmin={0} xmax={59} xstep={1} x={getMinutes(date)}
              onChange={onChangeMinutes}
          />
        </div>
        </div>
      </div>
      )
    }
  }

const mapStateToProps = store => {
  return {
    color: store.color
  }
}

export default connect(mapStateToProps)(TimePicker)
