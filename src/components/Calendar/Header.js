import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import dateFns from 'date-fns'
import * as actions from '../../actions'

class Header extends Component {
  render() {
    const { selectedDate } = this.props
    console.log('----------------1111')
    console.log(selectedDate)
    console.log('----------------1111')
    const year = dateFns.getYear(selectedDate)
    const xmonth = dateFns.getMonth(selectedDate)
    const title = dateFns.format(selectedDate, 'MMMM YYYY')

    console.log(`/${year}/${xmonth}`)
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <Link to={`/${year}/${xmonth}`} className="icon">chevron_left</Link>
        </div>
        <div className="col col-center">
          <span>{title}</span>
        </div>
        <div className="col col-end">
          <Link to={`/${year}/${xmonth+2}`} className="icon">chevron_right</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Header)
