// import dateFns from 'date-fns'
import React, { Component } from 'react'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../actions'

class Calendar extends Component {
  componentWillMount() {
    const { loadMonthDate } = this.props
    const { year, month } = this.props.match.params
    loadMonthDate(year, month)
  }

  // shouldComponentUpdate() {
  //   const { selectedDate } = this.props
  //   console.log('should component update...'+selectedDate)
  //   const { year, month } = this.props.match.params
  //
  //   const selectedYear = dateFns.getYear(selectedDate)
  //   const selectedMonth = dateFns.getMonth(selectedDate)
  //   console.log(`${year}-${month}`)
  //   console.log(`${selectedYear}-${selectedMonth}`)
  //   // if(year !== selectedYear || month !== selectedMonth) {
  //   //   loadMonthDate(year, month)
  //   //   console.log('simona')
  //   //   return false
  //   // }
  //   // console.log('nel')
  //   return true
  // }

  render() {
    // const { selectedDate, loadMonthDate } = this.props
    // const { year, month } = this.props.match.params
    //
    // const selectedYear = dateFns.getYear(selectedDate)
    // const selectedMonth = dateFns.getMonth(selectedDate)+1
    //
    // console.log(`${year}-${month}`)
    // console.log(`${selectedYear}-${selectedMonth}`)
    //
    // console.log('------------------------->')
    // console.log(selectedDate)
    // console.log(this.state)
    // console.log('------------------------->')
    //
    // if(selectedDate && (year !== selectedYear || month !== selectedMonth)) {
    //   loadMonthDate(year, month)
    // }

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

// export default connect(mapStateToProps, actions)(Calendar)

export default withRouter(connect(mapStateToProps, actions)(Calendar))
