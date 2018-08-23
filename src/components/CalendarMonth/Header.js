import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import dateFns from 'date-fns'
import * as actions from '../../actions'

const nextMonth = date => {
  return dateFns.format(dateFns.addMonths(date, 1), '/YYYY/M')
}

const prevMonth = date => {
  return dateFns.format(dateFns.subMonths(date, 1), '/YYYY/M')
}

class Header extends Component {

  render() {
    const { selectedDate } = this.props
    const title = dateFns.format(selectedDate, 'MMMM YYYY')
    const monthLink = dateFns.format(selectedDate, '/YYYY/M')
    return (
      <div className="xheader">
        <div className="xdate"><Link to={prevMonth(selectedDate)} className="icon">chevron_left</Link></div>
        <div className="xtitle">
          <Link to={monthLink}><span>{title}</span></Link>
        </div>
        <div className="xdate"><Link to={nextMonth(selectedDate)} className="icon">chevron_right</Link></div>
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
