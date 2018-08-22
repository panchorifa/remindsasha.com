import dateFns from 'date-fns'

export const loadMonthDate = (year, month) => (dispatch) => {
  dispatch({type: 'LOAD_MONTH', year: year, month: month})
}

export const selectDay = day => (dispatch) => {
  dispatch({type: 'LOAD_DAY', day: day})
}
