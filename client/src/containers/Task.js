import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import Timer from './Timer'

function Task({ task, timers, onStartTimer }) {
  return (
    <Card>
      <Container>
        {task.description}
        <Flex />
        <button onClick={onStartTimer}>
          start timer
        </button>
      </Container>
      <div>
        {timers.map(timer =>
          <Timer timer={timer} key={timer.id} />
        )}
      </div>
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => ({
  timers: ownProps.task.timer_ids.map(id => state.timers.byId[id])
})

export default connect(mapStateToProps)(Task)


const Card = styled('div')`
  border: 1px solid #aaa;
  width: 210px;
  height: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
`

const Container = styled('div')`
  display: flex;
`

const Flex = styled('div')`
  flex: 1;
`
