import React, { Component } from "react"
import {connect} from "react-redux"
import Header from "./Header"
import Days from "./Days"
import Cells from "./Cells"
import * as actions from "../../actions"
import "./Calendar.scss"

class Calendar extends Component {
  componentDidMount() {
    this.props.loadApp(localStorage)
  }

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

export default connect(() => {}, actions)(Calendar)
