import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  reminders: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
  }],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const fetchReminders = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.reminders
      case 'active':
        return fakeDatabase.reminders.filter(t => !t.completed)
      case 'completed':
        return fakeDatabase.reminders.filter(t => t.completed)
      default:
        throw new Error(`Unknown filter: ${filter}`)
    }
  })

export const addReminder = (text) =>
  delay(500).then(() => {
    const reminder = {
      id: v4(),
      text,
      completed: false,
    }
    fakeDatabase.reminders.push(reminder)
    return reminder
  })

export const toggleReminder = (id) =>
  delay(500).then(() => {
    const r = fakeDatabase.reminders.find(t => t.id === id)
    r.completed = !r.completed
    return r
  })
