import { combineReducers } from 'redux'
import {
  FETCH_TIMERS_SUCCESS,
  START_TIMER_SUCCESS,
  STOP_TIMER_SUCCESS,
} from '../actions'

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_TIMERS_SUCCESS:
      return {
        ...state,
        ...action.timers.reduce((obj, entry) => {
          obj[entry.id] = entry
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
    case FETCH_TIMERS_SUCCESS:
      return action.timers.map(entry => entry.id)
    case START_TIMER_SUCCESS:
      return [action.timer.id, ...state]
    default:
      return state
  }
}

const timers = combineReducers({
  byId,
  list
})

export function getAllTimers(state) {
  return state.list.map(id => state.byId[id])
}

export default combineReducers({
  timers
})
