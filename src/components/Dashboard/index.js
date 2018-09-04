import dateFns, {isSameMonth} from "date-fns"
import React, {Component} from "react"
import {connect} from "react-redux"
import * as actions from "../../actions"
import CurrentDate from "./CurrentDate"
import Calendar from "../Calendar"
import Reminders from "../Reminders"
import "./Dashboard.scss"

class Dashboard extends Component {

  validateParams = () => {
    const { year, month, day } = this.props.match.params
    try {
      if(year && day) {
        const date = new Date(year, month-1, day)
        if(dateFns.getYear(date) ===  parseInt(year, 10) &&
           dateFns.getMonth(date) === (parseInt(month, 10)-1) &&
           date.getDate() === parseInt(day, 10)) {
          return true
        }
      } else if(year && month) {
        const date = new Date(year, month-1)
        if(dateFns.getYear(date) ===  parseInt(year, 10) &&
          dateFns.getMonth(date) === (parseInt(month, 10)-1) ) {
          return true
        }
      } else if(!year) {
        return true;
      }
    } catch(err){}
    this.props.history.push("/")
  }

  componentWillMount() {
    const { year, month, day } = this.props.match.params
    if(day) {
      this.props.loadDayDate(new Date(year, month, day))
    } else {
      this.props.loadMonthDate(new Date(year, month))
    }
  }

  componentDidUpdate() {
    this.validateParams()
    const { mode, selectedDate,
      loadMonthDate, loadDayDate } = this.props
    const { year, month, day } = this.props.match.params

    if(selectedDate && year) {
      if(day) {
        const date = new Date(year, month-1, day)
        if(!dateFns.isSameDay(selectedDate, date)) {
          loadDayDate(date)
        }
      } else {
        if(mode !== "month" || !isSameMonth(selectedDate, new Date(year, month-1))) {
          loadMonthDate(new Date(year, month-1))
        }
      }
    } else if(selectedDate && !year) {
      const today = new Date()
      if(mode!=="day" || !dateFns.isSameDay(selectedDate, today)) {
        loadDayDate(today)
      }
    }
  }

  render() {
    return (
      <div className="flex-col main">
        <div>
          <CurrentDate/>
        </div>
        <div className="flex-row">
          <div className="main-reminders"><Reminders/></div>
          <div className="main-calendar"><Calendar/></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    mode: store.mode,
    selectedDate: store.selectedDate
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
