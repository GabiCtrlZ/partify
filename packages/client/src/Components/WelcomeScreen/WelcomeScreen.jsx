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

function WelcomeScreen(props) {
  const classes = useStyles(props)
  const [openCreate, setOpenCreate] = useState(false)
  const [openJoin, setOpenJoin] = useState(false)

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
      <CreateModal open={openCreate} handleClose={() => setOpenCreate(false)} />
      <JoinModal open={openJoin} handleClose={() => setOpenJoin(false)} />
    </>
  )
}

export default connect()(WelcomeScreen)
