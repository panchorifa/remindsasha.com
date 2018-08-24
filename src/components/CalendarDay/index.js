// import dateFns from 'date-fns'
import React, {Component} from 'react'
// import Header from './Header'
// import {connect} from 'react-redux'
// import * as actions from '../../actions'
import Reminders from '../Reminders'

class CalendarDay extends Component {
  render() {
    return (
      <div>
        <Reminders/>
      </div>
    )
  }
}

export default CalendarDay
// const mapStateToProps = store => {
//   return {
//     selectedDate: store.selectedDate
//   }
// }
//
// export default connect(mapStateToProps, actions)(CalendarDay)
