import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import PartifyButton from '../Common/PartifyButton'
import CreateModal from './CreateModal'
import JoinModal from './JoinModal'

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '100%',
    height: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  paperContainer: {
    width: '80%',
    height: '60%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 28,
  },
}), { name: 'WelcomeScreen' })

let roomId
let roomSecret

try {
  // eslint-disable-next-line prefer-destructuring
  roomId = window.location.search.match(/roomId=[0-9a-zA-Z]+/g)[0].split('=')[1]
}
catch (e) {
  roomId = null
}

try {
  // eslint-disable-next-line prefer-destructuring
  roomSecret = window.location.search.match(/roomSecret=[0-9a-zA-Z]+/g)[0].split('=')[1]
}
catch (e) {
  roomSecret = null
}

function WelcomeScreen(props) {
  const classes = useStyles(props)
  const [openCreate, setOpenCreate] = useState(!!roomSecret)
  const [openJoin, setOpenJoin] = useState(!!roomId)

  return (
    <>
      <div className={classes.container}>
        {!openCreate && !openJoin && (
          <Paper className={classes.paperContainer}>
            <Typography className={classes.header}>
              Stream Music Toghether
            </Typography>
            <PartifyButton label="Create your room" onClick={() => setOpenCreate(true)} />
            <PartifyButton label="Join a room" onClick={() => setOpenJoin(true)} />
          </Paper>
        )}
      </div>
      <CreateModal open={openCreate} roomSecret={roomSecret} handleClose={() => setOpenCreate(false)} />
      <JoinModal open={openJoin} roomId={roomId} handleClose={() => setOpenJoin(false)} />
    </>
  )
}

export default connect()(WelcomeScreen)
