import React from 'react'

function Task({ task, onStartTimer }) {
  return (
    <div>
      <hr />
      <div>
        id: {task.id}
      </div>
      <div>
        {task.description}
      </div>
      <button onClick={onStartTimer}>
        start timer
      </button>
    </div>
  )
}

export default Task
