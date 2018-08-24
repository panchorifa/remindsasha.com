import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../Dashboard'
import ReminderForm from '../Reminders/Form'
import Profile from '../Profile'
import NotFound from '../NotFound'

export default ( {childProps} ) => (
  <Switch>
    <Route component={Dashboard} path="/" exact props={childProps}/>
    <Route component={Profile} path="/profile" exact props={childProps}/>
    <Route component={Dashboard} path="/:year/:month/:day" exact props={childProps}/>
    <Route component={Dashboard} path="/:year/:month" exact props={childProps}/>
    <Route component={Dashboard} path="/:year" exact props={childProps}/>
    <Route component={ReminderForm} path="/newreminder" exact props={childProps}/>
    <Route component={NotFound}/>
  </Switch>
)
