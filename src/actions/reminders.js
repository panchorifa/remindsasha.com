import { normalize } from 'normalizr'
import * as schema from './schema'
import * as api from '../api'
import { getIsFetching } from '../reducers'

export const fetchReminders = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_REMINDERS_REQUEST',
    filter,
  });

  return api.fetchReminders(filter).then(
    response => {
      dispatch({
        type: 'FETCH_REMINDERS_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfReminders),
      });
    },
    error => {
      dispatch({
        type: 'FETCH_REMINDERS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const addReminder = (text) => (dispatch) =>
  api.addReminder(text).then(response => {
    dispatch({
      type: 'ADD_REMINDER_SUCCESS',
      response: normalize(response, schema.reminder),
    });
  });

export const toggleReminder = (id) => (dispatch) =>
  api.toggleReminder(id).then(response => {
    dispatch({
      type: 'TOGGLE_REMINDER_SUCCESS',
      response: normalize(response, schema.reminder),
    });
  });
