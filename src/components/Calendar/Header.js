import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {format, addMonths, subMonths} from 'date-fns'
import * as actions from '../../actions'

class Header extends Component {
  nextMonth = date => {
    return format(addMonths(date, 1), '/YYYY/M')
  }

  prevMonth = date => {
    return format(subMonths(date, 1), '/YYYY/M')
  }

  render() {
    const { selectedDate } = this.props
    const title = format(selectedDate, 'MMMM YYYY')
    const monthLink = format(selectedDate, '/YYYY/M')
    return (
      <div className="cal-header">
        <div className="date"><Link to={this.prevMonth(selectedDate)} className="icon">chevron_left</Link></div>
        <div className="cal-title">
          <Link to={monthLink}><span>{title}</span></Link>
        </div>
        <div className="date"><Link to={this.nextMonth(selectedDate)} className="icon">chevron_right</Link></div>
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
