import { combineReducers } from 'redux'
import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
} from '../actions'

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        ...action.tasks.reduce((obj, task) => {
          obj[task.id] = task
          return obj
        }, {})
      }
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        [action.task.id]: action.task,
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
