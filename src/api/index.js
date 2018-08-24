import dateFns from 'date-fns'

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  reminders: {
    '8/2018': {
      '8/17/2018': {
        '8/17/2018 4:00': {color: 'purple', text: 'Hello Vato', time: ''},
        '8/17/2018 6:00': {color: 'pink', text: 'Hello Ese', time: ''}
      }
    }
  }
}

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

const monthFmt = (date) => dateFns.format(date, 'M/YYYY')
const dayFmt = (date) => dateFns.format(date, 'M/D/YYYY')
const timeFmt = (date) => dateFns.format(date, 'M/D/YYYY HH:MM')

const monthlyReminders = (date) => fakeDatabase.reminders[monthFmt(date)]

export const fetchReminders = (date, filter) =>
  delay(500).then(() => {
    const reminders = monthlyReminders(date)
    if(reminders) {
      switch (filter) {
        case 'month':
          return reminders;
        case 'day':
          const day = dayFmt(date)
          return reminders.day ? reminders.day : []
        default:
          throw new Error(`Unknown filter: ${filter}`);
      }
    }
    return []
  }

export const addReminder = ({color, text, date}) =>
  delay(500).then(() => {
    const reminder = { color, text, date }
    const reminders = monthlyReminders(date)
    const day = dayFmt(date)
    const time = timeFmt(time)
    if(reminders.day && reminders.day.time) {
      throw Error('Already exists')
    } else if(reminders.day) {
      reminders.day.time = reminder
    }
    return reminder
  })

export const deleteReminder = (date) =>
  delay(500).then(() => {
    const reminders = monthlyReminders(date)
    const day = dayFmt(date)
    if(reminders.day) {
      const time = timeFmt(date)
      delete reminders.day[time]
    }
  })
