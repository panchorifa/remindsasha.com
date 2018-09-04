import {setHours, setMinutes, getHours, getMinutes} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import TimePicker from './TimePicker'
import ColorPicker from './ColorPicker'
import Repeats from './Repeats'
import colors from './Colors'
import * as actions from '../../../actions'
import './ReminderForm.scss'

class ReminderForm extends React.Component {
  state = {
    valid: false,
    date: null,
    error: null,
    text: ''
  }

  submit = (e) => {
    e.preventDefault()
    if(this.isValid()) {
      const {saveApp, selectedDate, color,
        addReminder, fetchReminders, fetchMonthBubbles} = this.props
      const {date, text} = this.state
      let xdate = selectedDate
      xdate=setHours(xdate, date ? getHours(date) : 0)
      xdate=setMinutes(xdate, date ? getMinutes(date) : 0)
      const xreminder = {text: text, color, date: xdate}
      addReminder(xreminder).then((response) => {
        fetchReminders(selectedDate, 'day')
        fetchMonthBubbles(selectedDate)
        this.setState({text: '', error: null, color: colors[0],
              date: null, valid: false})
        saveApp(localStorage)
      }).catch(error => {
        this.setState({error: error.message})
      })
    }
  }

  isValid() {
    return this.state.text.trim().length > 0
  }

  onChange = (e) => {
    this.setState({ text: e.target.value, valid: this.isValid(), updatedText: true})
  }

  componentDidMount() {
    this.setState({ valid: this.isValid(), text: ''})
  }

  pickColor = (color) => {
    this.props.changeColor(color)
  }

  close = () => {
    this.setState({text: '', error: null, color: colors[0], date: null})
    this.props.setView('list')
  }

  changeHours = pos => {
    const date = setHours(this.state.date, pos.x)
    this.setState({date: date, updated: true, valid: this.isValid()})
  }

  changeMinutes = pos => {
    const date = setMinutes(this.state.date, pos.x)
    this.setState({date: date, updated: true, valid: this.isValid()})
  }

  render() {
    const {error, text, valid, date} = this.state
    const {color} = this.props
    let xdate = date || new Date(2018,1,1,0,0)
    return (
      <form className='reminder-form' onSubmit={this.submit.bind(this)}
          style={{
            border: `2px solid ${color}`,
            borderTop: `2.4em solid ${color}`
          }}>
        <span onClick={this.close} className="times material-icons md-24">close</span>
        <h3>Add Reminder</h3>
        <TimePicker date={xdate}
            onChangeHours={this.changeHours}
            onChangeMinutes={this.changeMinutes}/>
        <ColorPicker colors={colors}
              selectedColor={color}
              onClick={this.pickColor}/>
        <Repeats/>
        <div>
          <input onChange={this.onChange} value={text}
              maxLength="30"/>
        </div>
        <div onClick={this.submit} className="btn"
              style={{
                opacity: valid ? 1 : .8,
                backgroundColor: color,
                cursor: valid ? 'pointer' : 'not-allowed'}}>
          <span className="icon">access_alarm</span>Add Reminder
        </div>
        <div className="error" style={{display: error ? 'block' : 'none'}}>{error}</div>
      </form>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate,
    color: store.color
  }
}

export default connect(mapStateToProps, actions)(ReminderForm)
