export const FETCH_TIMERS_REQUEST = 'FETCH_TIMERS_REQUEST'
export const FETCH_TIMERS_FAILURE = 'FETCH_TIMERS_FAILURE'
export const FETCH_TIMERS_SUCCESS = 'FETCH_TIMERS_SUCCESS'

export const START_TIMER_REQUEST = 'START_TIMER_REQUEST'
export const START_TIMER_FAILURE = 'START_TIMER_FAILURE'
export const START_TIMER_SUCCESS = 'START_TIMER_SUCCESS'

export const STOP_TIMER_REQUEST = 'STOP_TIMER_REQUEST'
export const STOP_TIMER_FAILURE = 'STOP_TIMER_FAILURE'
export const STOP_TIMER_SUCCESS = 'STOP_TIMER_SUCCESS'

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

export function fetchTimers() {
  return dispatch => {
    dispatch(fetchTimersRequest())
    return fetch(`/api/time_entries`, {
      headers: {
        'accept': 'application/json',
      },
      credentials: 'same-origin',
    }).then(response => response.json())
      .then(json => dispatch(fetchTimersSuccess(json)))
  }
}


function startTimerRequest(comment) {
  return {
    type: START_TIMER_REQUEST,
    comment
  }
}

function startTimerSuccess(timer) {
  return {
    type: START_TIMER_SUCCESS,
    timer
  }
}

export function startTimer(comment) {
  return dispatch => {
    dispatch(startTimerRequest(comment))
    return fetch(`/api/time_entries`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(response => response.json())
      .then(json => dispatch(startTimerSuccess(json)))
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
    }).then(response => response.json())
      .then(json => dispatch(stopTimerSuccess(json)))
  }
}
