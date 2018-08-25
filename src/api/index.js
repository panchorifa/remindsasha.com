import dateFns from 'date-fns'

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  reminders: {
  }
}

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

const monthFmt = (date) => dateFns.format(date, 'M/YYYY')
const dayFmt = (date) => dateFns.format(date, 'D')
const timeFmt = (date) => dateFns.format(date, 'HH:mm')

const monthlyReminders = date => {
  const month = monthFmt(date)
  const reminders = fakeDatabase.reminders
  if(!(month in reminders)) {
    reminders[month] = {}
  }
  return reminders[month]
}

export const fetchReminders = (date, filter) =>
  delay(500).then(() => {
    const reminders = monthlyReminders(date)
    if(Object.keys(reminders).length > 0) {
      switch (filter) {
        case 'month':
          const all = []
          if(Object.keys(reminders).length>0) {
            const z = Object.values(reminders)
            for(const entry of z) {
              if(Object.keys(entry).length>0) {
                all.push(Object.values(entry)[0])
              }
            }
          }
          // TODO clean this sorting thing
          return all.sort((a,b) => a.date - b.date)
        case 'day':
          const day = dayFmt(date)
          return day in reminders ? Object.values(reminders[day]).sort((a, b) => a.date - b.date) : []
        default:
          throw new Error(`Unknown filter: ${filter}`);
      }
    }
    return []
  })


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
      throw new Error('Reminder already exists!')
      // Promise.reject(new Error('Reminder already exists!'))
    } else {
      reminders[day][time] = reminder
    }
    return reminder
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
    const all = {}
    const days = Object.keys(reminders)
    //TODO simplify
    for(const day of days) {
      all[day] = Object.values(reminders[day]).map(r => r['color'])
    }
    return all
  })
