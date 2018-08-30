import {setHours, setMinutes, getHours, getMinutes} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import TimePicker from './TimePicker'
import ColorPicker from './ColorPicker'
import Repeats from './Repeats'
import colors from './Colors'
import * as actions from '../../../actions'
import './ReminderForm.scss'

// TODO refactor this with ReminderForm/index.js
class ReminderForm extends React.Component {
  state = {
    valid: false,
    date: new Date(),
    text: '',
    updated: false,
    updatedText: false,
    updatedColor: false,
    updatedTime: false,
    error: null
  }

  submit = (e) => {
    e.preventDefault()
    if(this.state.valid && this.isValid()) {
      const {date, updatedTime, updatedColor} = this.state
      const {color, saveApp, selectedDate, updateReminder, reminder,
        fetchReminders, fetchMonthBubbles} = this.props
      let xdate = reminder.date
      if(updatedTime) {
        xdate=setHours(xdate, getHours(date))
        xdate=setMinutes(xdate, getMinutes(date))
      }
      let xcolor = reminder.color
      if(updatedColor) {
        xcolor = color
      }
      const xreminder = {text: this.inputNode.value, color: xcolor, date: xdate}

      updateReminder(reminder.date, xreminder).then(() => {
        fetchReminders(selectedDate, 'day')
        fetchMonthBubbles(selectedDate)
        this.inputNode.value = ''
        this.setState({color: colors[0], updatedColor: false, updatedTime: false, updatedText: false, valid: false})
        saveApp(localStorage)
      }).catch(error => {
        this.setState({error: error.message})
      })
    }
  }

  isValid() {
    return this.inputNode.value.trim().length > 0
  }

  onChange = (e) => {
    this.setState({ text: e.target.value, valid: this.isValid(), updatedText: true})
  }

  componentDidMount() {
    this.setState({ valid: this.isValid(), text: ''})
  }

  pickColor = (color) => {
    this.props.changeColor(color)
    this.setState({updatedColor: true, valid: this.isValid()})
  }

  close = () => {
    this.setState({error: null, updatedText: false, updatedColor: false,
        updatedTime: false, valid: false})
    this.props.setView('list')
  }

  changeHours = pos => {
    const date = setHours(this.state.date, pos.x)
    this.setState({date: date, updatedTime: true, valid: this.isValid()})
  }

  changeMinutes = pos => {
    const date = setMinutes(this.state.date, pos.x)
    this.setState({date: date, updatedTime: true, valid: this.isValid()})
  }

  render() {
    const {color, reminder} = this.props
    const {error, text, valid, date, updatedText, updatedColor, updatedTime} = this.state
    const selectedValue = updatedText || !reminder ?  text : reminder.text
    const selectedColor = updatedColor || !reminder ? color : reminder.color
    const xdate = updatedTime || !reminder ? date : reminder.date
    return (
      <form className='reminder-form' onSubmit={this.submit.bind(this)}
            style={{
              border: `2px solid ${color}`,
              borderTop: `3.4em solid ${color}`
            }}>

        <span onClick={this.close} className="times material-icons md-24">close</span>
        <h3>Update Reminder</h3>
        <TimePicker date={xdate}
            onChangeHours={this.changeHours}
            onChangeMinutes={this.changeMinutes}/>
        <ColorPicker colors={colors}
              selectedColor={selectedColor}
              onClick={this.pickColor}/>
        <div>
          <input onChange={this.onChange}
              maxLength="30"
              value={selectedValue}
              ref={node => this.inputNode = node}/>
        </div>
        <div onClick={this.submit} className="btn"
              style={{opacity: valid ? 1 : .3,
                backgroundColor: color,
                cursor: valid ? 'pointer' : 'not-allowed'}}>


          <span className="icon">access_alarm</span>Update Reminder
        </div>
        <div className="error" style={{display: error ? 'block' : 'none'}}>{error}</div>
      </form>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate,
    view: store.view,
    reminder: store.reminder,
    color: store.color
  }
}

export default connect(mapStateToProps, actions)(ReminderForm)
