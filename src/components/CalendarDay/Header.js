import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import dateFns from 'date-fns'
import * as actions from '../../actions'

const nextDay = date => {
  return dateFns.format(dateFns.addDays(date, 1), '/YYYY/M/D')
}

const prevDay = date => {
  return dateFns.format(dateFns.subDays(date, 1), '/YYYY/M/D')
}

class Header extends Component {

  render() {
    const { selectedDate } = this.props
    const title = dateFns.format(selectedDate, 'MMMM D, YYYY')
    return (
      <div className="xheader">
        <div className="xdate"><Link to={prevDay(selectedDate)} className="icon">chevron_left</Link></div>
        <div className="xtitle"><span>{title}</span></div>
        <div className="xdate"><Link to={nextDay(selectedDate)} className="icon">chevron_right</Link></div>
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
