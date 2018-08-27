import dateFns from 'date-fns'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import CurrentDate from './CurrentDate'
import Reminder from './Reminder'
import ReminderForm from './ReminderForm'
import ReminderUpdate from './ReminderForm/ReminderUpdate'
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
    const {year, month, day} = this.props.match.params
    const { selectedDate, fetchReminders } = this.props

    const mode = (year && month && !day) ? 'month' : 'day'
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
          ? '<b>this month</b>'
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

  newReminder = () => {
    const {setView} = this.props
    setView('form')
  }

  render() {
    const {year, day} = this.props.match.params
    const {selectedDate, reminders, mode, view, fetching} = this.props
    const reminderItems = reminders.map(reminder =>
      <Reminder mode={mode} settings={reminder} key={reminder.date}/>
    )

    const msg = (!year || (year && day))
        ? this.dailyMessage(reminders)
        : this.monthlyMessage(reminders)

    // TODO refactor and reuse
    const today = new Date()
    const sameDay = dateFns.isSameDay(selectedDate, today)
    const pastDate = !sameDay && dateFns.isPast(selectedDate)
    return (
      <div className="dayreminders">
        <CurrentDate/>
        <hr/>
        <div className="loading" style={{display: fetching ?  'flex' : 'none'}}>
          <span className="material-icons md-24 fa-spin">data_usage</span>Loading...
        </div>
        <div style={{display: (fetching || view !== 'list') ? 'none' : 'flex'}}
             className="list">
          <div className="msg" dangerouslySetInnerHTML={msg}/>
          <div className="items">
            {reminderItems}
            <div style={{display: (pastDate || mode === 'month') ? 'none' : 'block'}}
              onClick={this.newReminder} className="newreminderbtn">New Reminder</div>
          </div>
        </div>
        <div style={{display: view === 'form' ? 'flex' : 'none'}}
             className="xform">
          <ReminderForm/>
        </div>
        <div style={{display: view === 'update' ? 'flex' : 'none'}}
             className="xform">
          <ReminderUpdate/>
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
