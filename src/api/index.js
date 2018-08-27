import {format, isSameHour, isSameMinute} from 'date-fns'

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

let fakeDatabase = {
  reminders: {
  }
}

const ALREADY_EXISTS_ERROR = new Error('Check the time. You already have a reminder at this time!')

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

const monthFmt = (date) => format(date, 'M/YYYY')
const dayFmt = (date) => format(date, 'D')
const timeFmt = (date) => format(date, 'HH:mm')

const monthlyReminders = date => {
  const month = monthFmt(date)
  const reminders = fakeDatabase.reminders
  if(!(month in reminders)) {
    reminders[month] = {}
  }
  return reminders[month]
}

const sorted = reminders => {
  return reminders.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
}

export const fetchReminders = (date, filter) =>
  delay(500).then(() => {
    const reminders = monthlyReminders(date)
    if(Object.keys(reminders).length > 0) {
      switch (filter) {
        case 'month':
          const all = []
          for(const day of Object.keys(reminders)) {
            for(const time of Object.keys(reminders[day])) {
              all.push(reminders[day][time])
            }
          }
          // TODO clean this sorting thing
          return sorted(all)
        case 'day':
          const day = dayFmt(date)
          return day in reminders ? sorted(Object.values(reminders[day])) : []
        default:
          throw new Error(`Unknown filter: ${filter}`);
      }
    }
    return []
  })

const fetchReminder = date => {
  const reminders = monthlyReminders(date)
  if(Object.keys(reminders).length > 0) {
    const day = dayFmt(date)
    if(day in reminders) {
      const time = timeFmt(date)
      return reminders[day][time]
    }
  }
  return null
}

export const addReminder = ({color, text, date}) =>
  delay(500).then(() => {
    const reminder = { color, text, date }
    const reminders = monthlyReminders(date)
    const day = dayFmt(date)
    const time = timeFmt(date)
    if(!(day in reminders)) {
      reminders[day] = {}
    }
    if(time in reminders[day]) {
      throw ALREADY_EXISTS_ERROR
    } else {
      reminders[day][time] = reminder
    }
    return reminder
  })

export const updateReminder = async (date, reminder) =>
  delay(500).then(() => {
    if( (!isSameHour(date, reminder.date) || !isSameMinute(date, reminder.date))
        && fetchReminder(reminder.date)) {
      throw ALREADY_EXISTS_ERROR
    }
    return deleteReminder(date).then(() => {
      addReminder(reminder).then(() => {
        return reminder
      })
    })
  })

export const deleteReminder = date =>
  delay(500).then(() => {
    const reminders = monthlyReminders(date)
    const day = dayFmt(date)
    if(day in reminders) {
      const time = timeFmt(date)
      delete reminders[day][time]
    }
  })

export const reset = date =>
  delay(500).then(() => {
    fakeDatabase.reminders = {}
  })

export const fetchBubbles = date =>
  delay(500).then(() => {
    const reminders = monthlyReminders(date)
    const days = Object.keys(reminders)
    const all = {}
    for(const day of days) {
      all[day] = Object.values(reminders[day]).map(r => r['color'])
    }
    return all
  })

const KEY = 'remindsasha'

export const loadApp = storage => {
  try {
    const serializedState = localStorage.getItem(KEY)
    if (serializedState === null) {
      return undefined;
    }
    fakeDatabase = JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}

export const saveApp = storage => {
  try {
    const serializedState = JSON.stringify(fakeDatabase)
    localStorage.setItem(KEY, serializedState)
  } catch (err) {
    console.log(err)
  }
}
