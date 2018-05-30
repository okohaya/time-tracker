import { combineReducers } from 'redux'
import {
  FETCH_TIMERS_SUCCESS,
  START_TIMER_SUCCESS,
  STOP_TIMER_SUCCESS,
  FETCH_TASKS_SUCCESS,
} from '../actions'

function tasks_to_timers(tasks) {
  const timers = {}
  tasks.forEach(task => {
    task.timers.forEach(timer => {
      timers[timer.id] = timer
    })
  })
  return timers
}

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        ...tasks_to_timers(action.tasks)
      }
    case FETCH_TIMERS_SUCCESS:
      return {
        ...state,
        ...action.timers.reduce((obj, timer) => {
          obj[timer.id] = timer
          return obj
        }, {})
      }
    case START_TIMER_SUCCESS:
      return {
        ...state,
        [action.timer.id]: action.timer,
      }
    case STOP_TIMER_SUCCESS:
      return {
        ...state,
        [action.timer.id]: action.timer,
      }
    default:
      return state
  }
}

function list(state = [], action) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return Object.values(tasks_to_timers(action.tasks)).map(x => x.id)
    case FETCH_TIMERS_SUCCESS:
      return action.timers.map(timer => timer.id)
    case START_TIMER_SUCCESS:
      return [action.timer.id, ...state]
    default:
      return state
  }
}

export default combineReducers({
  byId,
  list
})

export function getAllTimers(state) {
  return state.list.map(id => state.byId[id])
}
