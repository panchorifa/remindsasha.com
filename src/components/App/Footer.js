import React from "react"
import {Link} from "react-router-dom"
import "./Footer.scss"

export default () =>
    <div className="app-footer">
    <div className="footer">
      <div className="content">
        &copy; Sasha Corp, 2018
        <Link to="/suggestions">Got suggestions?</Link>
      </div>
      </div>
    </div>
