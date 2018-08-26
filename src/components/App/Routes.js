import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../Dashboard'
import ReminderForm from '../Reminders/ReminderForm'
import Profile from '../Profile'
import Suggestions from '../Suggestions'
import NotFound from '../NotFound'

export default ( {childProps} ) => (
  <Switch>
    <Route component={Dashboard} path="/" exact props={childProps}/>
    <Route component={Profile} path="/profile" exact props={childProps}/>
    <Route component={Suggestions} path="/suggestions" exact props={childProps}/>
    <Route component={Dashboard} path="/:year/:month/:day?" exact props={childProps}/>
    <Route component={ReminderForm} path="/newreminder" exact props={childProps}/>
    <Route component={NotFound}/>
  </Switch>
)
