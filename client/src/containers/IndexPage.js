import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { fetchTimers, startTimer, addTask, addTaskAndStartTimer, fetchTasks } from '../actions'
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
    //this.props.fetchTasks()
    this.props.fetchTimers()
  }

  handleClick() {
    this.props.addTaskAndStartTimer(this.input.value)
    this.input.value = '';
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
        <div>
          {timers.slice().reverse().map(timer =>
            <Timer key={timer.id} timer={timer} />
          )}
        </div>
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
  { fetchTimers, startTimer, addTask, addTaskAndStartTimer, fetchTasks }
)(IndexPage)


const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
`
