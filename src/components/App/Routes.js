import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CalendarMonth from '../CalendarMonth'
import CalendarDay from '../CalendarDay'
import ReminderForm from '../Reminders/Form'
import Profile from '../Profile'
import NotFound from '../NotFound'

export default ( {childProps} ) => (
  <Switch>
    <Route component={CalendarMonth} path="/" exact props={childProps}/>
    <Route component={Profile} path="/profile" exact props={childProps}/>
    <Route component={CalendarDay} path="/:year/:month/:day" exact props={childProps}/>
    <Route component={CalendarMonth} path="/:year/:month" exact props={childProps}/>
    <Route component={CalendarMonth} path="/:year" exact props={childProps}/>
    <Route component={ReminderForm} path="/newreminder" exact props={childProps}/>
    <Route component={NotFound}/>
  </Switch>
)
