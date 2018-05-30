import { combineReducers } from 'redux'
import timers from './timers'
import tasks from './tasks'

export default combineReducers({
  timers,
  tasks
})
