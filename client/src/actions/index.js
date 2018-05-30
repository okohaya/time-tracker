export const FETCH_TIMERS_REQUEST = 'FETCH_TIMERS_REQUEST'
export const FETCH_TIMERS_FAILURE = 'FETCH_TIMERS_FAILURE'
export const FETCH_TIMERS_SUCCESS = 'FETCH_TIMERS_SUCCESS'

export const START_TIMER_REQUEST = 'START_TIMER_REQUEST'
export const START_TIMER_FAILURE = 'START_TIMER_FAILURE'
export const START_TIMER_SUCCESS = 'START_TIMER_SUCCESS'

export const STOP_TIMER_REQUEST = 'STOP_TIMER_REQUEST'
export const STOP_TIMER_FAILURE = 'STOP_TIMER_FAILURE'
export const STOP_TIMER_SUCCESS = 'STOP_TIMER_SUCCESS'

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST'
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE'
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST'
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE'
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'


function fetchTimersRequest() {
  return {
    type: FETCH_TIMERS_REQUEST
  }
}

function fetchTimersSuccess(timers) {
  return {
    type: FETCH_TIMERS_SUCCESS,
    timers
  }
}

function fetchTimersFailure(error) {
  return {
    type: FETCH_TIMERS_FAILURE,
    error
  }
}


export function fetchTimers() {
  return dispatch => {
    dispatch(fetchTimersRequest())
    return fetch(`/api/time_entries`, {
      headers: {
        'accept': 'application/json',
      },
      credentials: 'same-origin',
    }).then(response =>
      response.json().then(json => {
        if (response.ok) {
          return json
        }
        return Promise.reject(json)
      })
    ).then(
      json => dispatch(fetchTimersSuccess(json)),
      json => dispatch(fetchTimersFailure(json))
    )
  }
}


function startTimerRequest(task_id) {
  return {
    type: START_TIMER_REQUEST,
    task_id
  }
}

function startTimerSuccess(timer) {
  return {
    type: START_TIMER_SUCCESS,
    timer
  }
}

function startTimerFailure(error) {
  return {
    type: START_TIMER_FAILURE,
    error
  }
}

export function startTimer(task_id) {
  return dispatch => {
    dispatch(startTimerRequest(task_id))
    return fetch(`/api/time_entries`, {
      method: 'POST',
      body: JSON.stringify({ task_id }),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(response =>
      response.json().then(json => {
        if (response.ok) {
          return json
        }
        return Promise.resolve(json)
      })
    ).then(
      json => dispatch(startTimerSuccess(json)),
      json => dispatch(startTimerFailure(json))
    )
  }
}

function stopTimerRequest(id) {
  return {
    type: STOP_TIMER_REQUEST,
    id
  }
}

function stopTimerSuccess(timer) {
  return {
    type: STOP_TIMER_SUCCESS,
    timer
  }
}

function stopTimerFailure(error) {
  return {
    type: STOP_TIMER_FAILURE,
    error
  }
}

export function stopTimer(id) {
  return dispatch => {
    dispatch(stopTimerRequest(id))
    return fetch(`/api/time_entries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ stopped_at: new Date }),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(response =>
      response.json().then(json => {
        if (response.ok) {
          return json
        }
        return Promise.reject(json)
      })
    ).then(
      json => dispatch(stopTimerSuccess(json)),
      json => dispatch(stopTimerFailure(json))
    )
  }
}


function addTaskRequest(description) {
  return {
    type: ADD_TASK_REQUEST,
    description
  }
}

function addTaskSuccess(task) {
  return {
    type: ADD_TASK_SUCCESS,
    task
  }
}

function addTaskFailure(error) {
  return {
    type: ADD_TASK_FAILURE,
    error
  }
}

export function addTask(description) {
  return dispatch => {
    dispatch(addTaskRequest(description))
    return fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(response =>
      response.json().then(json => {
        if (response.ok) {
          return json
        }
        return Promise.reject(json)
      })
    ).then(
      json => dispatch(addTaskSuccess(json)),
      json => dispatch(addTaskFailure(json))
    )
  }
}


function fetchTasksRequest() {
  return {
    type: FETCH_TASKS_REQUEST
  }
}

function fetchTasksSuccess(tasks) {
  return {
    type: FETCH_TASKS_SUCCESS,
    tasks
  }
}

function fetchTasksFailure(error) {
  return {
    type: FETCH_TASKS_FAILURE,
    error
  }
}

export function fetchTasks() {
  return dispatch => {
    dispatch(fetchTasksRequest())
    return fetch(`/api/tasks`, {
      headers: {
        'accept': 'application/json',
      },
      credentials: 'same-origin',
    }).then(response =>
      response.json().then(json => {
        if (response.ok) {
          return json
        }
        return Promise.reject(json)
      })
    ).then(
      json => dispatch(fetchTasksSuccess(json)),
      json => dispatch(fetchTasksFailure(json))
    )
  }
}
