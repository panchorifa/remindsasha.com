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
  console.log(year)
  console.log(month)
  if(year && isBetween(1969, 2100, parseInt(year, 10)) &&
     month && isBetween(0, 13, parseInt(month, 10))) {
       console.log('------------->'+month-1)
    return month-1
  }
  console.log('null month')
  return null
}

const loadDay = (year, month, day) => {
  if(day && year && isBetween(1969, 2100, year) &&
     month && isBetween(0, 13, month) &&
     isBetween(1, dateFns.getDaysInMonth(new Date(year, month, 1)), day)) {
    return day
  }
  return null
}

const loadDate = (year, month, day=null) => {
  const today = new Date()
  const y = loadYear(year) || dateFns.getYear(today)
  const m = loadMonth(year, month) || dateFns.getMonth(today)
  const d = day ? loadDay(day) : today.getDate()
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  console.log(y)
  console.log(m)
  console.log(d)
  const x = new Date(y, m, d)
  console.log(x)
  console.log(dateFns.getYear(x))
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  return x
}

const calendar = (state = {
    // selectedYear: null,
    // selectedMonth: null,
    // selectedDay: null,
    selectedDate: null
  }, action) => {
  switch (action.type) {
    case 'LOAD_MONTH':
      return {
        ...state,
        // selectedYear: loadYear(action.year, action.month),
        // selectedMonth: loadMonth(action.year, action.month),
        // selectedDay: null,
        selectedDate: loadDate(action.year, action.month)
      }
    // case 'LOAD_DAY':
      // return {
        // ...state,
        // selectedYear: loadYear(action.year, action.year),
        // selectedMonth: loadMonth(action.year, action.month),
        // selectedDay: loadDay(action.year, action.month, action.day)
      // }
    default:
      return state;
  }
}

export default calendar
