import React, {Component} from 'react'
import Header from '../Calendar/Header'
import {connect} from 'react-redux'
import * as actions from '../../actions/day'

class Reminders extends Component {
  render() {
    const {nextDay, prevDay} = this.props
    return <div>
      <Header title="Selected Date" next={nextDay} prev={prevDay}/>
      reminders
    </div>
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Reminders)
