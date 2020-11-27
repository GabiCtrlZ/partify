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

import { createRoom } from '../../store/actions/app'

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
}), { name: 'Create' })

function Create(props) {
  const classes = useStyles()
  const { handleClose, dispatch } = props
  const [name, setName] = useState('')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Room
        </Typography>
        <TextField
          className={classes.textField}
          onChange={({ target: { value } }) => setName(value)}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            dispatch(createRoom(name))
            handleClose()
          }}
        >
          Create
        </Button>
      </div>
    </Container>
  )
}

export default connect()(Create)
