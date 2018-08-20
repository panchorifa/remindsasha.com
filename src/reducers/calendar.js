import dateFns from 'date-fns'
// const reminder = (state, action) => {
//   switch (action.type) {
//     case 'ADD_REMINDER':
//       return {
//         id: action.id,
//         text: action.text,
//         completed: false,
//       };
//     case 'TOGGLE_REMINDER':
//       if (state.id !== action.id) {
//         return state;
//       }
//       return {
//         ...state,
//         completed: !state.completed,
//       };
//     default:
//       return state;
//   }
// };

const calendar = (state = {
  currentMonth: new Date(),
  selectedDate: new Date()
  }, action) => {
  switch (action.type) {
    case 'NEXT_MONTH':
      return {
        ...state,
        currentMonth: dateFns.addMonths(state.currentMonth, 1)
      }
    case 'PREV_MONTH':
      return {
        ...state,
        currentMonth: dateFns.subMonths(state.currentMonth, 1)
      }
    case 'SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.day
      }
    default:
      return state;
  }
}

export default calendar
