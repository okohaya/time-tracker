import React from 'react'
import { connect } from 'react-redux'
import Timer from './Timer'

function Task({ task, timers, onStartTimer }) {
  return (
    <div>
      <hr />
      <div>
        task id: {task.id}
      </div>
      <div>
        {task.description}
      </div>
      <button onClick={onStartTimer}>
        start timer
      </button>
      <div>
        {timers.map(timer =>
          <Timer timer={timer} key={timer.id} />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  timers: ownProps.task.timer_ids.map(id => state.timers.byId[id])
})

export default connect(mapStateToProps)(Task)
