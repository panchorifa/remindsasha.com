export const loadMonthDate = (year, month) => dispatch => {
  dispatch({type: 'LOAD_MONTH', year: year, month: month})
}

export const loadDayDate = (date) => dispatch => {
  dispatch({type: 'LOAD_DAY', date: date})
}

export const changeName = name => (dispatch) => {
  dispatch({type: 'CHANGE_NAME', name: name})
}
