import dateFns from 'date-fns'
import React, { Component } from 'react'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Calendar extends Component {
  render() {
    const {currentMonth, nextMonth, prevMonth} =  this.props
    const title = dateFns.format(currentMonth, 'MMMM YYYY')
    return (
      <div className="calendar">
        <Header title={title} next={nextMonth} prev={prevMonth}/>
        <Days/>
        <Cells/>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    currentMonth: store.currentMonth
  }
}

export default connect(mapStateToProps, actions)(Calendar)
