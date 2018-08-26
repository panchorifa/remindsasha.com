import dateFns from 'date-fns'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Calendar from '../Calendar'
import Reminders from '../Reminders'
import './Dashboard.scss'

class Dashboard extends Component {
  componentWillMount() {
    const { year, month, day } = this.props.match.params
    if(day) {
      this.props.loadDayDate(new Date(year, month, day))
      console.log('LOADIND DAY............')
      console.log('LOADIND DAY............')
      console.log('LOADIND DAY............')
      console.log('LOADIND DAY............')
      console.log('LOADIND DAY............')
      console.log('LOADIND DAY............')
      console.log('LOADIND DAY............')
    } else {
      this.props.loadMonthDate(year, month)
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
      console.log('LOADINMONTH/......................')
    }
  }

  componentDidUpdate() {
    const { mode, selectedDate, loadMonthDate, loadDayDate } = this.props
    const { year, month, day } = this.props.match.params

    if(selectedDate && year) {
      if(day) {
        const date = new Date(year, month-1, day)
        console.log('xxxxxxxxx')
        if(!dateFns.isSameDay(selectedDate, date)) {
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          console.log('LOADIND DAY............111')
          loadDayDate(date)
        }
      } else {
        if(mode !== 'month' || !dateFns.isSameMonth(selectedDate, new Date(year, month-1))) {
          console.log('LOADIND MMMM............2')
          console.log('LOADIND MMMM............2')
          console.log('LOADIND MMMM............2')
          console.log('LOADIND MMMM............2')
          console.log('LOADIND MMMM............2')
          console.log('LOADIND MMMM............2')
          console.log('LOADIND MMMM............2')
          loadMonthDate(year, month)
        }
      }
    } else if(selectedDate && !year) {
      const today = new Date()
      if(mode!=='day' || !dateFns.isSameDay(selectedDate, today)) {
        loadDayDate(today)
      }
    }
  }

  render() {
    return (
      <div className="main">
        <div className="reminders">
          <Reminders/>
        </div>
        <div className="calendar">
          <Calendar/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    mode: store.mode,
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
