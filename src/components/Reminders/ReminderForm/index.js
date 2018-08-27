import {setHours, setMinutes, getHours, getMinutes} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import TimePicker from './TimePicker'
import ColorPicker from './ColorPicker'
import * as actions from '../../../actions'
import './ReminderForm.scss'

const colors = [
  'black',
  '#00a8ff',
  '#9c88ff',
  '#fbc531',
  '#4cd137',
  '#22a6b3',
  '#487eb0',
  '#e84118',
  '#DC6ACF',
  '#8c7ae6',
  '#e91e63',
  '#72c117',
  '#542280',
  '#D614481',
  '#888','#444', '#aaa', 'blue']

class ReminderForm extends React.Component {
  state = {
    valid: false,
    color: colors[0],
    date: new Date(),
    text: '',
    updated: false,
    updatedText: false
  }

  submit = (e) => {
    e.preventDefault()
    if(this.state.valid && this.isValid()) {
      const {color, date} = this.state
      const {saveApp, selectedDate,
        addReminder, updateReminder, reminder, view,
        fetchReminders, fetchMonthBubbles} = this.props
      let xdate = selectedDate
      xdate=setHours(xdate, getHours(date))
      xdate=setMinutes(xdate, getMinutes(date))
      const xreminder = {text: this.inputNode.value, color, date: xdate}

      if(view === 'update') {
        updateReminder(reminder.date, xreminder).then(() => {
          fetchReminders(selectedDate, 'day')
          fetchMonthBubbles(selectedDate)
          this.inputNode.value = ''
          this.setState({color: colors[0], valid: false})
          saveApp(localStorage)
        }).catch(error => {
          console.log(error)
        })
      } else {
        addReminder(xreminder).then(() => {
          fetchReminders(selectedDate, 'day')
          fetchMonthBubbles(selectedDate)
          this.inputNode.value = ''
          this.setState({color: colors[0], valid: false})
          saveApp(localStorage)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }

  isValid() {
    return this.inputNode.value.trim().length > 0
  }

  onChange = (e) => {
    console.log(e.target.value)
    this.setState({ text: e.target.value, valid: this.isValid(), updatedText: true})
  }

  componentWillMount() {
    const {selectedDate} = this.props
    this.setState({date: selectedDate})
  }

  componentDidMount() {
    this.setState({ valid: this.isValid(), text: ''})
  }

  pickColor = (color) => {
    this.setState({color: color, updated: true, valid: this.isValid()})
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
    const {view, reminder} = this.props
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(view)
    console.log(reminder)
    const {text, valid, color, date, updated, updatedText} = this.state
    // let value = text
    // if(view === 'update' && !updated && reminder && text.length>=0){
    //   value = reminder.text
    // }
    const selectedValue = updatedText || !reminder ?  text : reminder.text
    const selectedColor = updated || !reminder ? color : reminder.color
    const selectedDate = updated || !reminder ? date : reminder.date
    return (
      <form className='reminder-form' onSubmit={this.submit.bind(this)}>
        <TimePicker date={selectedDate}
            onChangeHours={this.changeHours}
            onChangeMinutes={this.changeMinutes}/>
        <ColorPicker colors={colors}
              selectedColor={selectedColor}
              onClick={this.pickColor}/>
        <div>
          <input onChange={this.onChange}
              // placeholder="Enter your reminder"
              value={selectedValue}
              ref={node => this.inputNode = node}/>
        </div>
        <div onClick={this.submit} className="btn"
              style={{opacity: valid ? 1 : .3, cursor: valid ? 'pointer' : 'not-allowed'}}>
          <span className="icon">access_alarm</span>{view === 'update' ? 'Update' : 'Add'} Reminder
        </div>
      </form>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate,
    view: store.view,
    reminder: store.reminder
  }
}
export default connect(mapStateToProps, actions)(ReminderForm)
