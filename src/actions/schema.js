import { Schema, arrayOf } from 'normalizr'

export const reminder = new Schema('reminders')
export const arrayOfReminders = arrayOf(reminder);
