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

const isBetween = (min, max, value) => {
  return value > min && value < max
}

// const loadMonth = (year, month) => {
//   let date = new Date()
//   if (month) {
//     if(isBetween(0, 13, month)) {
//       date = new Date(year, month-1, 1)
//     } else {
//       date = new Date(year, dateFns.getMonth(date)+1, 1)
//       // this.props.history.push('/'+year)
//     }
//   } else if(year) {
//     if(isBetween(1969, 2100, year)) {
//       date =  new Date(year, dateFns.getMonth(date), 1)
//     } else {
//       // this.props.history.push('/')
//     }
//   }
//   return date
// }

const loadYear = (year, month) => {
  console.log(year)
  if(year && isBetween(1969, 2100, parseInt(year, 10))) {
    return year
  }
  return null
}

const loadMonth = (year, month) => {
  if(year && isBetween(1969, 2100, parseInt(year, 10)) &&
     month && isBetween(0, 13, parseInt(month, 10))) {
    return month-1
  }
  return -1
}

const loadDay = (year, month, day) => {
  if(day && year && isBetween(1969, 2100, year) &&
     month && isBetween(0, 13, month) &&
     isBetween(1, dateFns.getDaysInMonth(new Date(year, month)), day)) {
    return day
  }
  return null
}

const loadDate = (year, month, day=null) => {
  const today = new Date()
  const y = loadYear(year) || dateFns.getYear(today)
  let m = loadMonth(year, month)
  if(m === null) {
    m = dateFns.getMonth(today)
  }
  const d = day ? loadDay(day) : today.getDate()
  const x = new Date(y, m, d)
  return x
}

const calendar = (state = {
    name: 'Sasha',
    selectedDate: null,
    mode: 'day', //day or month
    view: 'list', // list or form
    modal: true,
    fetchingReminders: false,
    fetchingBubbles: false,
    reminders: [],
    monthColors: {}
  }, action) => {
  switch (action.type) {
    case 'LOAD_MONTH':
      return {
        ...state,
        selectedDate: loadDate(action.year, action.month),
        mode: 'month',
        view: 'list'
      }
    case 'LOAD_DAY':
      return {
        ...state,
        selectedDate: action.date,
        mode: 'day',
        view: 'list'
      }
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.modal
      }
    case 'SET_VIEW':
      return {
        ...state,
        view: action.view
      }
    case 'FETCHING_REMINDERS':
      return {
        ...state,
        fetchingReminders: true
      }
    case 'FETCHING_BUBBLES':
      return {
        ...state,
        fetchingBubbles: true
      }
    case 'FETCH_REMINDERS_SUCCESS':
      return {
        ...state,
        reminders: action.response,
        fetchingReminders: false
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
    default:
      return state;
  }
}

export default calendar
