import * as api from '../api'

export const loadMonthDate = date => dispatch =>
  dispatch({type: 'LOAD_MONTH', date: date})

export const loadDayDate = date => dispatch =>
  dispatch({type: 'LOAD_DAY', date: date})

export const changeName = name => dispatch =>
  dispatch({type: 'CHANGE_NAME', name: name})

export const changeColor = color => dispatch =>
  dispatch({type: 'CHANGE_COLOR', color: color})

export const editReminder = reminder => dispatch =>
  dispatch({type: 'SET_VIEW', view: 'update', reminder: reminder})

export const setView = (view, reminder=null) => dispatch =>
  dispatch({type: 'SET_VIEW', view: view, reminder: reminder})

export const fetchReminders = (date, mode, reload=true) => (dispatch, getState) => {
  if(reload) {
    dispatch({type: 'FETCHING_REMINDERS', mode: mode})
  }
  return api.fetchReminders(date, mode).then(
    response => {
      dispatch({type: 'FETCH_REMINDERS_SUCCESS', response: response})
    })
}

export const fetchMonthBubbles = date => dispatch => {
  dispatch({type: 'FETCHING_BUBBLES'})
  return api.fetchBubbles(date).then(
    response => {
      dispatch({type: 'FETCH_BUBBLES_SUCCESS', response: response})
    })
}

export const fetchHolidays = () => dispatch => {
  return api.fetchHolidays().then(
    response => {
      dispatch({type: 'FETCH_HOLIDAYS_SUCCESS', response: response})
    })
}

export const addReminder = reminder => dispatch =>
  api.addReminder(reminder)
    .then(response => {
      dispatch({type: 'ADD_REMINDER_SUCCESS', response: response})
    })

export const deleteReminder = date => (dispatch, getState) =>
  api.deleteReminder(date)
    .then(response => {
      dispatch({type: 'DELETE_REMINDER_SUCCESS'})
    })

export const updateReminder = (date, reminder) => (dispatch, getState) =>
  api.updateReminder(date, reminder)
    .then(response => {
      dispatch({type: 'UPDATE_REMINDER_SUCCESS'})
    })

export const loadApp = storage => dispatch => {
  api.loadApp(storage)
  api.fetchHolidays().then(
    response => {
      dispatch({type: 'FETCH_HOLIDAYS_SUCCESS', response: response})
    })
}

export const saveApp = storage => dispatch =>
  api.saveApp(storage)
