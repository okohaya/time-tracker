import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { stopTimer } from '../actions'

const padding = x => ('00' + x).slice(-2)

function to_time(time_str) {
  if (!time_str) {
    return null
  }
  const date = new Date(time_str)
  const hour = date.getHours()
  const min = date.getMinutes()
  return [hour, min].map(padding).join(':')
}

function to_date(str) {
  const date = new Date(str)
  const mon = date.getMonth() + 1
  const day = date.getDate()
  return mon + '/' + day
}

function elapsed(timer) {
  const t1 = new Date(timer.started_at)
  const t2 = new Date(timer.stopped_at || Date.now())
  const diff = (t2 - t1) / 1000
  const min = Math.floor(diff / 60 % 60)
  const hour = Math.floor(diff / 60 / 60)

  return [hour, min].map(padding).join(':')
}

function Timer({ timer, stopTimer }) {
  const is_running = !timer.stopped_at
  return (
    <Container active={is_running}>
      <Item style={{width: 70}}>
        {to_date(timer.started_at)}
      </Item>
      <Item style={{width: 130}}>
        {to_time(timer.started_at)} - {to_time(timer.stopped_at)}
      </Item>
      <Item style={{width: 80}}>
        ({elapsed(timer)})
      </Item>
      <Item style={{width: 150}}>
        {timer.task.description}
      </Item>
      <Item style={{flex: 1}}>
        {timer.comment}
      </Item>
      <Item style={{width: 100}}>
        {is_running &&
          <button onClick={() => stopTimer(timer.id)}>
            stop
          </button>
        }
      </Item>
    </Container>
  )
}

export default connect(
  null,
  { stopTimer }
)(Timer)


const Container = styled('div')`
  background: ${props =>
    props.active ? 'red' : '#eee'};
  border: 1px solid #999;
  display: flex;
`

const Item = styled('div')`
`
