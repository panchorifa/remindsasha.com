import dateFns from 'date-fns'
import React, { Component } from 'react'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../actions'

class CalendarMonth extends Component {
  render() {
    return (
      <div className="calendar">
        <Header/>
        <Days/>
        <Cells/>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default withRouter(connect(mapStateToProps, actions)(CalendarMonth))
