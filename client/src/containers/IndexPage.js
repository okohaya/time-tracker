import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTimers, startTimer, stopTimer } from '../actions'
import { getAllTimers } from '../reducers'
import Timer from '../components/Timer'

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchTimers()
  }

  handleClick() {
    this.props.startTimer(this.input.value)
  }

  render() {
    const { timers, stopTimer } = this.props
    return (
      <div>
        <h1>time tracker</h1>
        <div>
          <div>new time entry</div>
          <input ref={input => this.input = input} />
          <button onClick={this.handleClick}>
            start
          </button>
        </div>
        {timers.map(timer =>
          <Timer timer={timer} stopTimer={stopTimer} key={timer.id} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    timers: getAllTimers(state.timers)
  }
}

export default connect(
  mapStateToProps,
  { fetchTimers, startTimer, stopTimer }
)(IndexPage)
