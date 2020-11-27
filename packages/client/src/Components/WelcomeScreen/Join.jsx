import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'

import { joinRoom } from '../../store/actions/app'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    '& label': {
      color: 'black',
    },
    '& div': {
      background: 'white',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    color: 'white',
    marginTop: theme.spacing(1),
  },
  submit: {
    color: 'white',
    margin: theme.spacing(3, 0, 2),
  },
}), { name: 'Join' })

function Join(props) {
  const classes = useStyles()
  const { handleClose, dispatch } = props
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join Room
        </Typography>
        <TextField
          onChange={({ target: { value } }) => setName(value)}
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          placeholder="Name"
          id="name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          onChange={({ target: { value } }) => setRoom(value)}
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          placeholder="Room code"
          name="room"
          type="text"
          id="room"
          autoComplete="current-room"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            handleClose()
            dispatch(joinRoom(name, room))
          }}
        >
          Join
        </Button>
      </div>
    </Container>
  )
}

export default connect()(Join)
