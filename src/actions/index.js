export const loadMonthDate = (year, month) => dispatch => {
  dispatch({type: 'LOAD_MONTH', year: year, month: month})
}

export const loadDayDate = (date) => dispatch => {
  dispatch({type: 'LOAD_DAY', date: date})
}

export const changeName = name => dispatch => {
  dispatch({type: 'CHANGE_NAME', name: name})
}

export const setModal = modal => dispatch => {
  dispatch({type: 'SET_MODAL', modal: modal})
}

export const setView = view => dispatch => {
  dispatch({type: 'SET_VIEW', view: view})
}
