import dateFns from 'date-fns'
import React, { Component } from 'react'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Calendar extends Component {
  componentWillMount() {
    const { loadMonthDate } = this.props
    const { year, month } = this.props.match.params
    loadMonthDate(year, month)
  }

  shouldComponentUpdate() {
    console.log('should component update...')
    const { selectedYear, selectedMonth, loadMonthDate } = this.props
    const { year, month } = this.props.match.params
    if(year !== selectedYear || month !== selectedMonth) {
      loadMonthDate(year, month)
      return true
    }
    return false
  }

  render() {
    const {selectedDate} = this.props
    return (
      <div className="calendar">
        <Header date={selectedDate}/>
        <Days/>
        <Cells/>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    // selectedYear: store.selectedYear,
    // selectedMonth: store.selectMonth,
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Calendar)
