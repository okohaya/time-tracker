import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTimers, startTimer, addTask, fetchTasks } from '../actions'
import { getAllTimers } from '../reducers/timers'
import { getAllTasks } from '../reducers/tasks'
import Timer from './Timer'
import Task from './Task'

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchTasks()
    this.props.fetchTimers()
  }

  handleClick() {
    this.props.addTask(this.input.value)
  }

  render() {
    const { timers, tasks, startTimer } = this.props
    return (
      <div>
        <h1>time tracker</h1>

        <div>
          <div>new task</div>
          <input ref={input => this.input = input} />
          <button onClick={this.handleClick}>
            add task
          </button>
        </div>

        <h3>task list</h3>
        {tasks.map(task =>
          <Task task={task} onStartTimer={() => startTimer(task.id)} key={task.id} />
        )}

        <h3>timer list</h3>
        {timers.map(timer =>
          <Timer timer={timer} key={timer.id} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    timers: getAllTimers(state.timers),
    tasks: getAllTasks(state.tasks),
  }
}

export default connect(
  mapStateToProps,
  { fetchTimers, startTimer, addTask, fetchTasks }
)(IndexPage)
