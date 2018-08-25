import dateFns from 'date-fns'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import CurrentDate from './CurrentDate'
import Reminder from './Reminder'
import ReminderForm from '../ReminderForm'
import * as actions from '../../actions'
import './Reminders.scss'

class Reminders extends Component {

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDate !== prevProps.selectedDate) {
      this.fetchData()
    }
  }

  fetchData() {
    const { selectedDate, mode, fetchReminders } = this.props
    fetchReminders(selectedDate, mode);
  }

  close() {
    const month = dateFns.format(this.props.selectedDate, '/YYYY/M')
    this.props.history.push(month)
  }

  dailyMessage(reminders) {
    const today = new Date()
    const {name, selectedDate} = this.props
    const sameDay = dateFns.isSameDay(selectedDate, today)
    const pastDay = dateFns.isPast(selectedDate) && !sameDay
    let prefix = pastDay ? 'did' : 'do'
    let suffix = sameDay ? '<b>today</b>' : 'on ' + dateFns.format(selectedDate, 'M/D/YYYY')
    if(dateFns.isSameDay(selectedDate, dateFns.addDays(today, 1))) {
      suffix = 'tomorrow'
    }else if(dateFns.isSameDay(selectedDate, dateFns.subDays(today, 1))) {
      suffix = 'yesterday'
    }
    const total = reminders.length
    if(total > 0) {
      prefix = pastDay ? 'had' : 'have'
      const r = total > 1 ? 'reminders' : 'reminder'
      return {__html: `${name}, you ${prefix} <b>${total}</b> ${r} ${suffix}.`}
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
      const r = total > 1 ? 'reminders' : 'reminder'
      return {__html: `${name}, you have <b>${total}</b> ${r} ${suffix}.`}
    }
    return {__html: `${name}, you ${prefix} not have any reminders ${suffix}.`}
  }

  toggleView(view) {
    const {setView} = this.props
    setView(view)
  }

  render() {
    const {year, day} = this.props.match.params
    const {selectedDate, reminders, mode, view, fetching} = this.props
    const reminderItems = reminders.map(reminder =>
      <Reminder settings={reminder} key={reminder.date}/>
    )

    const msg = (!year || (year && day))
        ? this.dailyMessage(reminders)
        : this.monthlyMessage(reminders)

    // TODO refactor and reuse
    const today = new Date()
    const sameDay = dateFns.isSameDay(selectedDate, today)
    const pastDate = dateFns.isPast(selectedDate) && !sameDay

    return (
      <div className="dayreminders">
        <CurrentDate/>
        <hr/>
        <div className="loading" style={{display: fetching ?  'block' : 'none'}}>
          Loading...
        </div>
        <div style={{display: (fetching || view !== 'list') ? 'none' : 'block'}}
             className="list">
          <div className="msg" dangerouslySetInnerHTML={msg}/>
          <div className="items">
            {reminderItems}
          </div>
          <div style={{display: (pastDate || mode === 'month') ? 'none' : 'block'}}
            onClick={() => this.toggleView('form')} className="newreminderbtn">New Reminder</div>
        </div>
        <div style={{display: view === 'list' ? 'none' : 'block'}}
             className="form">
          <ReminderForm/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    name: store.name,
    selectedDate: store.selectedDate,
    mode: store.mode,
    view: store.view,
    reminders: store.reminders,
    fetching: store.fetchingReminders
  }
}

export default withRouter(connect(mapStateToProps, actions)(Reminders))
