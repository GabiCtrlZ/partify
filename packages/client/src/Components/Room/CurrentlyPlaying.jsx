import React, { useState } from 'react'
import {
  Drawer,
  makeStyles,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { connect } from 'react-redux'
import cn from 'classnames'

import noTrack from '../../assets/no-track.png'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '100vw',
    height: '50vh',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position: 'fixed',
    bottom: 0,
    background: '#2D3339',
    display: 'flex',
    alignItems: 'center',
  },
  drawerOpen: {
    width: '100vw',
    height: '50vh',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: '0.75s',
    }),
    flexDirection: 'column',
    alignItems: 'center',
  },
  drawerClose: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: '0.5s',
    }),
    overflowX: 'hidden',
    height: theme.measurements.playingClosedDrawerHight,
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(11) + 1,
    },
    flexDirection: 'row',
  },
  smallSongImage: {
    background: '#212529',
    width: '20%',
    height: '80%',
    marginLeft: 5,
    marginBottom: 2,
    transition: theme.transitions.create('all', {
      duration: '0.5s',
    }),
  },
  largeSongImage: {
    marginTop: '7.5vh',
    marginBottom: '5vh',
    background: '#212529',
    width: '80%',
    height: '50%',
    transition: theme.transitions.create('all', {
      duration: '0.5s',
    }),
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  mainText: {
    color: '#fff',
    fontWeight: 'bolder',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '2vw',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: '1s',
    }),
  },
  mainTextLarge: {
    alignSelf: 'flex-start',
    paddingLeft: '12.5%',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: '1s',
    }),
  },
  captionText: {
    color: '#007A76',
    fontWeight: 'bolder',
  },
  closeButton: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
}), { name: 'CurrentlyPlaying' })

function CurrentlyPlaying({ currentlyPlayingSong }) {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const {
    artist = 'No Track',
    image = noTrack,
    name = 'Playlist queue is empty',
  } = currentlyPlayingSong || {}

  return (
    <Drawer
      variant="permanent"
      open={open}
      anchor="bottom"
      className={cn(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: cn(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      onClick={() => !open && setOpen(true)}
    >
      {open && (
        <IconButton
          className={classes.closeButton}
          onClick={() => setOpen(false)}
        >
          <ExpandMore />
        </IconButton>
      )}
      <Paper
        elevation={5}
        className={cn({
          [classes.largeSongImage]: open,
          [classes.smallSongImage]: !open,
        })}
      >
        <img alt="songImg" className={classes.imageStyles} src={image} />
      </Paper>

      <Typography
        variant="body2"
        className={cn(classes.mainText, { [classes.mainTextLarge]: open })}
      >
        {name}
        <Typography variant="caption" className={classes.captionText}>
          {artist}
        </Typography>
      </Typography>
    </Drawer>
  )
}

const mapStateToProps = ({ app: { currentlyPlayingSong } }) => ({
  currentlyPlayingSong,
})

export default connect(mapStateToProps)(CurrentlyPlaying)
