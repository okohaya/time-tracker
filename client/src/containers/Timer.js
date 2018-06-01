import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { stopTimer } from '../actions'

const padding = x => ('00' + x).slice(-2)

function to_local(time_str) {
  if (!time_str) {
    return null
  }
  const date = new Date(time_str)
  const mon = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()

  return [mon, day].map(padding).join('/')
    + ' '
    + [hour, min].map(padding).join(':')
}

function elapsed(timer) {
  const t1 = new Date(timer.started_at)
  const t2 = new Date(timer.stopped_at || Date.now())
  const diff = (t2 - t1) / 1000
  const sec = Math.floor(diff % 60)
  const min = Math.floor(diff / 60 % 60)
  const hour = Math.floor(diff / 60 / 60)

  return hour + 'h' + padding(min) + 'm'
}

function Timer({ timer, task, stopTimer }) {
  const is_running = !timer.stopped_at
  return (
    <Container active={is_running}>
      <div>
        {to_local(timer.started_at)} ({elapsed(timer)})
        {' '}
        {is_running &&
          <button onClick={() => stopTimer(timer.id)}>
            stop
          </button>
        }
      </div>
    </Container>
  )
}

const mapStateToProps = (state, ownProps) => ({
  task: state.tasks.byId[ownProps.timer.task_id]
})

export default connect(
  mapStateToProps,
  { stopTimer }
)(Timer)


const Container = styled('div')`
  background: ${props =>
    props.active ? 'red' : '#ccc'};
`
