import React from 'react'
import { connect } from 'react-redux'
import { stopTimer } from '../actions'

function to_local(time) {
  return time ? (new Date(time)).toLocaleString() : "running"
}

function Timer({ timer, task, stopTimer }) {
  const is_running = !timer.stopped_at
  return (
    <div>
      <hr />
      <div>
        <div>id: {timer.id}</div>
        <div>task: {task.description}</div>
        <div>comment: {timer.comment}</div>
        <div>started_at: {to_local(timer.started_at)}</div>
        <div>stopped_at: {to_local(timer.stopped_at)}</div>
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
