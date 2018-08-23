import dateFns from 'date-fns'
import React, {Component} from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Reminders from '../Reminders'

class CalendarDay extends Component {
  // componentWillMount() {
  //   const { year, month, day } = this.props.match.params
  //   const date = new Date(year, month-1, day)
  //   this.props.loadDayDate(date)
  // }
  //
  // componentDidUpdate() {
  //   const { selectedDate, loadDayDate } = this.props
  //   const { year, month, day } = this.props.match.params
  //
  //   if(selectedDate) {
  //     const date = new Date(year, month-1, day)
  //     if(!dateFns.isSameDay(selectedDate, date)) {
  //       loadDayDate(date)
  //     }
  //   }
  // }

  render() {
    return (
      <div>
        <Reminders/>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(CalendarDay)
