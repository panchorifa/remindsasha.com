import {format} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../actions'
import './Reminder.scss'

class Reminder extends React.Component {
  state = {
    deleteme: false,
    deleting: false
  }
  edit = (e) => {
    e.preventDefault()
    const {editReminder} = this.props
    const {color, text, date}  = this.props.settings
    const reminder = {color, text, date}
    editReminder(reminder)
  }
  deleteWarning = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({deleteme: true})
  }
  cancelDelete = () => {
    this.setState({deleteme: false})
  }
  deleteForSure = (e) => {
    e.preventDefault()
    this.setState({deleting: true})
    const {date} = this.props.settings
    const {saveApp, selectedDate, mode, deleteReminder,
          fetchMonthBubbles, fetchReminders} = this.props
    deleteReminder(date).then(() => {
      fetchReminders(selectedDate, mode, false)
      fetchMonthBubbles(selectedDate)
      saveApp(localStorage)
    })
  }
  render() {
    const {color, text, date} = this.props.settings
    const {mode} = this.props
    const fmt = mode === 'month' ? 'M/D/YY h:mm a' : 'h:mm a'
    const time = format(date, fmt)
    const {deleteme, deleting} = this.state
    return (
      <div className="reminder">
        <div className="main" onClick={this.edit}
              style={{display: deleteme ? 'none' : 'block'}}>
          <div className="color" style={{backgroundColor: color}}/>
          <div className="content">
            <div className="actions">
              <style jsx>{`
                .actions:hover {
                  color: ${color};
                }
              `}</style>
              <a onClick={this.deleteWarning}
                style={{color: color}}
                className="material-icons md-24">delete
                <span class="tooltiptext">Delete Reminder</span>
              </a>
            </div>
            <div className="title">
              <div className="icon" style={{color: color}}>access_alarm</div>
              <div className="time" style={{color: color}}>{time}</div>
            </div>
            <div className="text">{text}</div>
          </div>
        </div>
        <div className="warning" style={{
          backgroundColor: color,
          display: deleteme ? 'flex' : 'none'}}>
          <div>{deleting ? 'Deleting...' : 'Delete this reminder ?'}</div>
          <div className="actions" style={{display: deleting ? 'none' : 'block'}}>
            <button onClick={this.deleteForSure}>Yes</button>
            <button onClick={this.cancelDelete}>No</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate,
    mode: store.mode,
    view: store.view
  }
}

export default connect(mapStateToProps, actions)(Reminder)
