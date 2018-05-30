import { combineReducers } from 'redux'
import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  START_TIMER_SUCCESS,
} from '../actions'

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        ...action.tasks.reduce((obj, task) => {
          const { timers, ...props } = task
          obj[task.id] = {
            ...props,
            timer_ids: timers.map(timer => timer.id),
          }
          return obj
        }, {})
      }
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        [action.task.id]: {
          ...action.task,
          timer_ids: [],
        },
      }
    case START_TIMER_SUCCESS: {
      const id = action.timer.task_id
      return {
        ...state,
        [id]: {
          ...state[id],
          timer_ids: state[id].timer_ids.concat(action.timer.id)
        }
      }
    }
    default:
      return state
  }
}

function list(state = [], action) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return action.tasks.map(task => task.id)
    case ADD_TASK_SUCCESS:
      return [action.task.id, ...state]
    default:
      return state
  }
}

export default combineReducers({
  byId,
  list
})

export function getAllTasks(state) {
  return state.list.map(id => state.byId[id])
}
