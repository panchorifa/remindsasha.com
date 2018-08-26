import {setHours, setMinutes, getHours, getMinutes} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import TimePicker from './TimePicker'
import ColorPicker from './ColorPicker'
import * as actions from '../../actions'
import './Form.scss'

const colors = ['blue', 'red', 'yellow', 'pink',
  'purple', 'black', 'cyan', '#DC6ACF',
  '#FF5427', '#72c117', '#542280', '#D614481']

class ReminderForm extends React.Component {
  state = {
    valid: false,
    color: colors[0],
    date: new Date()
  }

  submit(e) {
    e.preventDefault()
    if(this.isValid()) {
      const {color, date} = this.state
      const {selectedDate, addReminder, fetchReminders, fetchMonthBubbles} = this.props
      let xdate = selectedDate
      console.log(getHours(date))
      xdate=setHours(xdate, getHours(date))
      console.log(xdate)
      xdate=setMinutes(xdate, getMinutes(date))
      const reminder = {text: this.inputNode.value, color, date: xdate}
      console.log('--------------------------------')
      console.log('--------------------------------')
      console.log(date)
      console.log(reminder)
      console.log('--------------------------------')
      console.log('--------------------------------')


      addReminder(reminder).then(() => {
        console.log('success')
        fetchReminders(selectedDate, 'day')
        fetchMonthBubbles(selectedDate)
        this.inputNode.value = ''
        this.setState({color: colors[0], valid: false})
      }).catch(error => {
        console.log(error)
      })
    }
  }

  isValid() {
    return this.inputNode.value.trim().length > 0
  }

  onChange(e) {
    this.setState({ valid: this.isValid()})
  }

  componentWillMount() {
    const {selectedDate} = this.props
    this.setState({date: selectedDate})
  }

  componentDidMount() {
    this.setState({ valid: this.isValid()})
  }

  pickColor(color) {
    this.setState({color: color})
  }

  changeHours = pos => {
    const date = setHours(this.state.date, pos.x)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(pos.x)
    console.log(date)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
    this.setState({date: date})
  }

  changeMinutes = pos => {
    const date = setMinutes(this.state.date, pos.x)
    this.setState({date: date})
  }

  render() {
    const {valid, color, date} = this.state
    return (
      <form className='reminder-form' onSubmit={this.submit.bind(this)}>
        <TimePicker date={date}
            onChangeHours={this.changeHours.bind(this)}
            onChangeMinutes={this.changeMinutes.bind(this)}/>
        <ColorPicker colors={colors} selectedColor={color}
            onClick={this.pickColor.bind(this)}/>
        <div>
          <input onChange={this.onChange.bind(this)}
              ref={node => this.inputNode = node}/>
        </div>
        <div onClick={this.submit.bind(this)} className="btn"
              style={{opacity: valid ? 1 : .3}}>
          <span className="icon">access_alarm</span>Add Reminder
        </div>
      </form>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}
export default connect(mapStateToProps, actions)(ReminderForm)
