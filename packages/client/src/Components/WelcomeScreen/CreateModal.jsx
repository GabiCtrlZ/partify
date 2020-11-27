import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Create from './Create'

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
}), { name: 'CreateModal' })

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />)

export default function CreateModal(props) {
  const classes = useStyles()
  const { open, handleClose } = props

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Create handleClose={handleClose} />
    </Dialog>
  )
}
