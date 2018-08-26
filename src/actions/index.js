import * as api from '../api'

export const loadMonthDate = (year, month) => dispatch =>
  dispatch({type: 'LOAD_MONTH', year: year, month: month})

export const loadDayDate = date => dispatch =>
  dispatch({type: 'LOAD_DAY', date: date})

export const changeName = name => dispatch =>
  dispatch({type: 'CHANGE_NAME', name: name})

export const setModal = modal => dispatch =>
  dispatch({type: 'SET_MODAL', modal: modal})

export const setView = view => dispatch =>
  dispatch({type: 'SET_VIEW', view: view})

export const fetchReminders = (date, mode) => dispatch => {
  dispatch({type: 'FETCHING_REMINDERS', mode: mode})
  return api.fetchReminders(date, mode).then(
    response => {
      dispatch({type: 'FETCH_REMINDERS_SUCCESS', response: response})
    })
}

export const fetchMonthBubbles = (date) => dispatch => {
  dispatch({type: 'FETCHING_BUBBLES'})
  return api.fetchBubbles(date).then(
    response => {
      dispatch({type: 'FETCH_BUBBLES_SUCCESS', response: response})
    })
}

export const addReminder = (reminder) => dispatch =>
  api.addReminder(reminder)
    .then(response => {
      // this.fetchBubbles(reminder.date)
      dispatch({type: 'ADD_REMINDER_SUCCESS', response: response})
    })
    .catch(error => {
      dispatch({type: 'ADD_REMINDER_FAILURE', error: error})
    })
