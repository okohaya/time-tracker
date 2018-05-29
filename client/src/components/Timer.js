import React from 'react'

function to_local(time) {
  return time ? (new Date(time)).toLocaleString() : "running"
}

function Timer({ timer, stopTimer }) {
  return (
    <div>
      <hr />
      <div>
        <div>id: {timer.id}</div>
        <div>comment: {timer.comment}</div>
        <div>started_at: {to_local(timer.started_at)}</div>
        <div>stopped_at: {to_local(timer.stopped_at)}</div>
        <button onClick={() => stopTimer(timer.id)}>
          stop
        </button>
      </div>
    </div>
  )
}

export default Timer
