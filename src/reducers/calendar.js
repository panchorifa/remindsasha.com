const calendar = (state = {
    name: 'Sasha',
    selectedDate: null,
    mode: 'day', //day/month
    view: 'list', // list/form/update
    fetchingReminders: false,
    fetchingBubbles: false,
    fetchingHolidays: false,
    reminders: [],
    holidays: {},
    reminder: null,
    monthColors: {}
  }, action) => {
  switch (action.type) {
    case 'LOAD_MONTH':
      return {
        ...state,
        // selectedDate: loadDate(action.year, action.month),
        selectedDate: action.date,
        mode: 'month',
        view: 'list'
      }
    case 'LOAD_DAY':
      return {
        ...state,
        // selectedDate: action.date,
        selectedDate: action.date,
        mode: 'day',
        view: 'list'
      }
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_VIEW':
      return {
        ...state,
        view: action.view,
        reminder: action.reminder
      }
    case 'FETCHING_REMINDERS':
      return {
        ...state,
        fetchingReminders: true,
        reminder: null,
        view: 'list'
      }
    case 'FETCHING_BUBBLES':
      return {
        ...state,
        fetchingBubbles: true
      }
    case 'FETCHING_HOLIDAYS':
      return {
        ...state,
        fetchingHolidays: true
      }
    case 'FETCH_HOLIDAYS_SUCCESS':
      return {
        ...state,
        holidays: action.response,
        fetchingHolidays: false
      }
    case 'FETCH_REMINDERS_SUCCESS':
      return {
        ...state,
        reminders: action.response,
        fetchingReminders: false,
        reminder: null,
        view: 'list'
      }
    case 'FETCH_REMINDERS_FAILURE':
      return {
        ...state,
        reminders: [],
        fetchingReminders: false
      }
    case 'FETCH_BUBBLES_SUCCESS':
      return {
        ...state,
        monthColors: action.response,
        fetchingBubbles: false
      }
    case 'ADD_REMINDER_SUCCESS':
      return {
        ...state,
        view: 'list'
      }
    case 'ADD_REMINDER_FAILURE':
      return {
        ...state,
        view: 'form'
      }
    case 'UPDATE_REMINDER_SUCCESS':
      return {
        ...state,
        view: 'list'
      }
    case 'DELETE_REMINDER_SUCCESS':
      return {
        ...state
      }
    default:
      return state;
  }
}

export default calendar
