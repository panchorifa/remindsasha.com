// import dateFns from 'date-fns';

export const nextMonth = () => (dispatch) => {
  dispatch({type: 'NEXT_MONTH'})
}

export const prevMonth = () => (dispatch) => {
  dispatch({type: 'PREV_MONTH'})
}

export const selectDate = day => (dispatch) => {
  dispatch({type: 'SELECTED_DATE', day: day})
}
