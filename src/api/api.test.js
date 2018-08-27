import dateFns from 'date-fns'
import * as api from './index'

describe('api', () => {
  const date = new Date(2018, 1, 1, 10, 30)
  const date2 = new Date(2018, 1, 1, 10, 40)
  const reminder = {date: date, color: 'pink', text: 'Math Homework'}
  const reminder2 = {date: date2, color: 'purple', text: 'Sci Homework'}

  beforeEach(async () => {
    api.reset()
    let reminders = await api.fetchReminders(date, 'day')
    expect(reminders).toEqual([])
    reminders = await api.fetchReminders(date, 'month')
    expect(reminders).toEqual([])
    expect(await api.addReminder(reminder)).toEqual(reminder)
    expect(await api.addReminder(reminder2)).toEqual(reminder2)
  })

  test('error - reminder already exists', async () => {
    //TODO
    // try {
    //   const r = await api.addReminder(reminder)
    // } catch(err) {
    //   console.log(err)
    // }
    // await expect(api.addReminder(reminder)).rejects.ToThrow(/already exists/)
    // expect(await api.addReminder(reminder)).toThrowError(/already exists/)
  })

  test('fetch monthly reminders', async () => {
    const reminders = await api.fetchReminders(date, 'month')
    expect(reminders.length).toEqual(2)
    expect(reminders).toMatchSnapshot()
    const xdate = reminders[0].date
    expect(dateFns.format(xdate, 'M/D/YYYY HH:mm')).toEqual('2/1/2018 10:30')
  })

  test('fetch daily reminders', async () => {
    const reminders = await api.fetchReminders(date, 'day')
    expect(reminders.length).toEqual(2)
    expect(reminders).toMatchSnapshot()
  })

  test('delete reminder', async () => {
    await api.deleteReminder(date)
    await api.deleteReminder(date2)
    const reminders = await api.fetchReminders(date, 'month')
    expect(reminders).toEqual([])
  })

  test('update reminder', async () => {
    const date3 = new Date(2018,1,1,11,0)
    const reminder = {color: 'black', text: 'updated', date: date3}
    await api.updateReminder(date, reminder)
    const reminders = await api.fetchReminders(date, 'day')
    expect(reminders.length).toEqual(2)
    expect(reminders[1]).toEqual(reminder)
  })

  test('get bubbles', async () => {
    const date3 = new Date(2018, 1, 1, 11, 30)
    const reminder3 = {date: date3, color: 'purple', text: 'Sci Homework'}
    await api.addReminder(reminder3)

    const bubbles = await api.fetchBubbles(date)
    expect(bubbles).toMatchSnapshot()
  })
})
