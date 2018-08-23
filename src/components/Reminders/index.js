import dateFns from 'date-fns'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import CurrentDate from './CurrentDate'
import Reminder from './Reminder'

class Reminders extends Component {
  close() {
    const month = dateFns.format(this.props.selectedDate, '/YYYY/M')
    this.props.history.push(month)
  }

  dailyMessage(reminders) {
    const today = new Date()
    const {name, selectedDate} = this.props
    const sameDay = dateFns.isSameDay(selectedDate, today)
    let prefix = (dateFns.isPast(selectedDate) && !sameDay) ? "did" : "do"
    let suffix = sameDay ? 'today' : 'on ' + dateFns.format(selectedDate, 'M/YY')
    if(dateFns.isSameDay(selectedDate, dateFns.addDays(today, 1))) {
      suffix = 'tomorrow'
    }else if(dateFns.isSameDay(selectedDate, dateFns.subDays(today, 1))) {
      suffix = 'yesterday'
    }
    const total = reminders.length
    if(total > 0) {
      return {__html: `${name}, you have <b>${total}</b> reminders ${suffix}.`}
    }
    return {__html: `${name}, you ${prefix} not have any reminders ${suffix}.`}
  }

  monthlyMessage(reminders) {
    const today = new Date()
    const {name, selectedDate} = this.props
    const sameMonth = dateFns.isSameMonth(selectedDate, today)
    let prefix = (dateFns.isPast(selectedDate) && !sameMonth) ? "did" : "do"
    let suffix = sameMonth
          ? 'this month'
          : dateFns.isSameYear(selectedDate, today)
              ? 'this ' + dateFns.format(selectedDate, 'MMMM')
              : 'on ' + dateFns.format(selectedDate, 'MMMM YYYY')
    if(dateFns.isSameDay(selectedDate, dateFns.addDays(today, 1))) {
      suffix = 'tomorrow'
    }else if(dateFns.isSameDay(selectedDate, dateFns.subDays(today, 1))) {
      suffix = 'yesterday'
    }
    const total = reminders.length
    if(total > 0) {
      return {__html: `${name}, you have <b>${total}</b> reminders ${suffix}.`}
    }
    return {__html: `${name}, you ${prefix} not have any reminders ${suffix}.`}
  }

  render() {
    const {name, selectedDate} = this.props
    const {year, day} = this.props.match.params
    const today = new Date()
    let msg = ''
    const reminders = [
      {
        color: 'blue',
        text:'This is a reminder with a maximum of 50 chars what'
      },
      {
        color: 'orange',
        text:'This is a reminder with a maximum of 50 chars what'
      }
    ]
    const reminderItems = reminders.map((reminder) =>
      <Reminder settings={reminder}/>
    )
    console.log(reminderItems)

    if(!year || (year && day)) {
      msg =  this.dailyMessage(reminders)
    } else {
      msg = this.monthlyMessage(reminders)
    }
    return (
      <div className="dayreminders">
        <CurrentDate/>
        <div className="list">
          <div className="msg" dangerouslySetInnerHTML={msg}/>
          <div className="items">
            {reminderItems}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    name: store.name,
    selectedDate: store.selectedDate
  }
}

export default withRouter(connect(mapStateToProps)(Reminders))
