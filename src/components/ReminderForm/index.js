import React from 'react'
import {connect} from 'react-redux'
import TimePicker from './TimePicker'
import ColorPicker from './ColorPicker'
import * as actions from '../../actions'
import './Form.scss'

const colors = ['blue', 'red', 'yellow', 'pink',
  'purple', 'black', 'cyan', 'orange',
  'blue', 'red', 'yellow', 'pink']

class ReminderForm extends React.Component {
  addReminder() {
    const {setView} = this.props
    setView('list')
  }
  render() {
    return (
      <div className='reminder-form'>
        <TimePicker/>
        <ColorPicker colors={colors}/>
        <div>
          <input value=""/>
        </div>
        <div className="btn" onClick={this.addReminder.bind(this)}>
          <span className="icon">access_alarm</span>Add Reminder
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {

  }
}
export default connect(mapStateToProps, actions)(ReminderForm)
