import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { Button, Container } from '@material-ui/core'
import { connect } from 'react-redux'
import { addSong, removeSong } from '../../store/actions/app'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: 'black',
    color: 'white',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: 'white',
  },
  img: {
    width: 150,
    height: 150,
    marginTop: theme.spacing(10),
  },
  name: {
    fontSize: 20,
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
  },
  artist: {
    color: 'rgb(190, 190, 190)',
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(5),
    fontWeight: 'bold',
  },
}), { name: 'Modal' })

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

function Modal(props) {
  const classes = useStyles()
  const {
    open, handleClose, songData, action, dispatch,
  } = props

  const {
    image,
    uri,
    name,
    artist,
  } = songData

  const onClick = () => {
    if (action === 'add') return dispatch(addSong(uri, songData, handleClose)) // TODO connect
    dispatch(removeSong(uri, handleClose))
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className={classes.img}
          alt="grid-button"
        />
        <div className={classes.name}>
          {name}
        </div>
        <div className={classes.artist}>
          {artist}
        </div>
        <Button
          variant="contained"
          color={action === 'add' ? 'primary' : 'error'}
          className={classes.button}
          onClick={onClick}
        >
          {action === 'add' ? 'Add to ' : 'Remove from '}
          {'Playlist'}
        </Button>
      </Container>
    </Dialog>
  )
}

export default connect()(Modal)
