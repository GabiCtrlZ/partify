import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import copy from 'copy-to-clipboard'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { FileCopy, WhatsApp } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { get } from 'lodash'
import { playSnackbar } from '../lib/snackbar'
import { leave } from '../store/actions/app'

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: theme.measurements.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    background: 'black',
    zIndex: 3,
    border: 0,
  },
  menuItem: {
    color: 'white',
  },
  accountIcon: {
    color: 'white',
    borderColor: fade('#FFF', 0.5),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    borderRadius: 8,
    textTransform: 'none',
  },
  menu: {
    background: 'rgba(0, 0, 0, 1)',
  },
  logoContainer: {
    display: 'flex',
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    userSelect: 'none',
    '& > div': {
      letterSpacing: '1.5px',
      fontSize: 20,
    },
  },
}), { name: 'Header' })

const getCurrentPath = () => get(window.location.href.split('?'), '0', 'defultRoute')

function Header(props) {
  const classes = useStyles(props)
  const { name, room, dispatch } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => setAnchorEl(null)

  const copyRoomLink = () => {
    if (room) {
      copy(`${getCurrentPath()}?roomId=${room}`)
      return playSnackbar('Copied room link to clipboard!', {
        variant: 'success',
      })
    }

    playSnackbar('First you need to create rtoom blyaat', { variant: 'error' })
  }

  return (
    <AppBar
      color="primary"
      variant="outlined"
      position="static"
      classes={{ root: classes.appBar }}
    >
      <div className={classes.logoContainer}>
        <div>Partify</div>
      </div>
      {name && (
        <>
          <Button
            classes={{ root: classes.accountIcon }}
            onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
            variant="outlined"
          >
            {name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className={classes.menu}>
              <MenuItem className={classes.menuItem} onClick={copyRoomLink}>
                <div>
                  <div style={{ fontSize: 11 }}>Room Code</div>
                  <Typography color="secondary">{room || 'No room'}</Typography>
                </div>
                {room && (
                  <IconButton className={classes.menuItem} aria-label="copy">
                    <FileCopy />
                  </IconButton>
                )}
              </MenuItem>
              {room && (
                <>
                  <a
                    style={{ textDecoration: 'none', color: 'white' }}
                    href={`whatsapp://send?text=${getCurrentPath()}?roomId=${room}`}
                  >
                    <MenuItem className={classes.menuItem}>
                      Share to WhatsApp
                      <IconButton
                        className={classes.menuItem}
                        aria-label="copy"
                      >
                        <WhatsApp />
                      </IconButton>
                    </MenuItem>
                  </a>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => dispatch(leave())}
                  >
                    Leave
                  </MenuItem>
                </>
              )}
            </div>
          </Menu>
        </>
      )}
    </AppBar>
  )
}

const mapStateToProps = ({ app: { name, room } }) => ({
  name,
  room,
})

export default connect(mapStateToProps)(Header)
