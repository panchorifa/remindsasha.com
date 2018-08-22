import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Calendar from '../Calendar'
import ReminderForm from '../Reminders/Form'
import Reminders from '../Reminders'
import NotFound from '../NotFound'

export default ( {childProps} ) => (
  <Switch>
    <Route component={Calendar} path="/" exact props={childProps}/>
    <Route component={Reminders} path="/:year/:month/:day" exact props={childProps}/>
    <Route component={Calendar} path="/:year/:month" exact props={childProps}/>
    <Route component={Calendar} path="/:year" exact props={childProps}/>
    <Route component={ReminderForm} path="/newreminder" exact props={childProps}/>
    <Route component={NotFound}/>
  </Switch>
)
