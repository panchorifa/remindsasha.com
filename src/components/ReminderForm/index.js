import React from 'react'
import ColorPicker from './ColorPicker'
import './Form.scss'

const colors = ['blue', 'red', 'yellow', 'pink',
  'purple', 'black', 'cyan', 'orange',
  'blue', 'red', 'yellow', 'pink']

class ReminderForm extends React.Component {
  addReminder() {
    console.log('simon')
  }
  render() {
    return (
      <div className='reminder-form'>
        <ColorPicker colors={colors}/>
        <input/>
        <button type="button" onClick={this.addReminder}>
          Add Reminder
        </button>
      </div>
    )
  }
}

export default ReminderForm
