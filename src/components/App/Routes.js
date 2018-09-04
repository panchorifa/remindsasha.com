import React from "react"
import { Route, Switch } from "react-router-dom"
import Dashboard from "../Dashboard"
import Profile from "../Profile"
import Suggestions from "../Suggestions"
import NotFound from "../NotFound"

export default ( {childProps} ) =>
  <div className="app-content">
    <div className="content">
      <Switch>
        <Route component={Profile} path="/profile" exact props={childProps}/>
        <Route component={Suggestions} path="/suggestions" exact props={childProps}/>
        <Route component={Dashboard} path="/:year?" exact props={childProps}/>
        <Route component={Dashboard} path="/:year/:month/:day?" exact props={childProps}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </div>
