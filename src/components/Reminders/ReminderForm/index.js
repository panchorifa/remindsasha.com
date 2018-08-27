import {setHours, setMinutes, getHours, getMinutes} from 'date-fns'
import React from 'react'
import {connect} from 'react-redux'
import TimePicker from './TimePicker'
import ColorPicker from './ColorPicker'
import colors from './Colors'
import * as actions from '../../../actions'
import './ReminderForm.scss'

class ReminderForm extends React.Component {
  state = {
    valid: false,
    date: null,
    color: colors[0],
    error: null
  }

  submit = (e) => {
    e.preventDefault()
    if(this.isValid()) {
      const {saveApp, selectedDate,
        addReminder, fetchReminders, fetchMonthBubbles} = this.props
      const {color, date} = this.state
      let xdate = selectedDate
      console.log('>>>>>>>>>>>>>>>')
      console.log('>>>>>>>>>>>>>>>')
      console.log('>>>>>>>>>>>>>>>')
      console.log('>>>>>>>>>>>>>>>')
      console.log('>>>>>>>>>>>>>>>')
      console.log('>>>>>>>>>>>>>>>')
      console.log('>>>>>>>>>>>>>>>')
      console.log('>>>>>>>>>>>>>>>')
      console.log(date)
      xdate=setHours(xdate, date ? getHours(date) : 0)
      xdate=setMinutes(xdate, date ? getMinutes(date) : 0)
      const xreminder = {text: this.inputNode.value, color, date: xdate}
      addReminder(xreminder).then((response) => {
        fetchReminders(selectedDate, 'day')
        fetchMonthBubbles(selectedDate)
        this.inputNode.value = ''
        // xdate = new Date()
        // xdate = setHours(0)
        // xdate = setMinutes(0)
        this.setState({text: '', error: null, color: colors[0],
              date: null, valid: false})
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

  componentWillMount() {
    const {selectedDate} = this.props
    this.setState({date: selectedDate})
  }

  componentDidMount() {
    this.setState({ valid: this.isValid(), text: ''})
  }

  pickColor = (color) => {
    this.setState({color: color})
  }

  close = () => {
    // let date = this.props.selectedDate
    // date = setHours(date, 0)
    // date = setMinutes(date, 0)
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
    const {error, text, valid, color, date} = this.state
    let xdate = date || new Date(2018,1,1,0,0)
    return (
      <form className='reminder-form' onSubmit={this.submit.bind(this)}>
        <span onClick={this.close} className="times material-icons md-24">close</span>
        <h3>Add Reminder</h3>
        <TimePicker date={xdate}
            onChangeHours={this.changeHours}
            onChangeMinutes={this.changeMinutes}/>
        <ColorPicker colors={colors}
              selectedColor={color}
              onClick={this.pickColor}/>
        <div>
          <input onChange={this.onChange} value={text}
              maxLength="30"
              ref={node => this.inputNode = node}/>
        </div>
        <div onClick={this.submit} className="btn"
              style={{opacity: valid ? 1 : .3, cursor: valid ? 'pointer' : 'not-allowed'}}>
          <span className="icon">access_alarm</span>Add Reminder
        </div>
        <div className="error" style={{display: error ? 'block' : 'none'}}>{error}</div>
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
