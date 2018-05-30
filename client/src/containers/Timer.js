import React from 'react'
import { connect } from 'react-redux'
import { stopTimer } from '../actions'

function to_local(time) {
  return time ? (new Date(time)).toLocaleString() : "running"
}

function elapsed(timer) {
  const t1 = new Date(timer.started_at)
  const t2 = new Date(timer.stopped_at || Date.now())
  const diff = (t2 - t1) / 1000
  const sec = Math.floor(diff % 60)
  const min = Math.floor(diff / 60 % 60)
  const hour = Math.floor(diff / 60 / 60)

  const padding = x => ('00' + x).slice(-2)
  return [hour, min, sec].map(padding).join(':')
}

function Timer({ timer, task, stopTimer }) {
  const is_running = !timer.stopped_at
  return (
    <div>
      <hr />
      <div>
        <div>comment: {timer.comment}</div>
        <div>started_at: {to_local(timer.started_at)}</div>
        <div>stopped_at: {to_local(timer.stopped_at)}</div>
        <div>elapsed: {elapsed(timer)}</div>
        {is_running &&
          <button onClick={() => stopTimer(timer.id)}>
            stop
          </button>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  task: state.tasks.byId[ownProps.timer.task_id]
})

export default connect(
  mapStateToProps,
  { stopTimer }
)(Timer)
