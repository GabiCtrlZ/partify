import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
// import Logo from '../assets/Icons/Logo'

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
      // marginTop: 4,
      // borderTop: '1px solid',
      letterSpacing: '1.5px',
      fontSize: 20,
    },
  },
}), { name: 'Header' })

function Header(props) {
  const classes = useStyles(props)
  const {
    name,
    room,
  } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar
      color="primary"
      variant="outlined"
      position="static"
      classes={{ root: classes.appBar }}
    >
      <div className={classes.logoContainer}>
        {/* <Logo /> */}
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
            <div
              className={classes.menu}
            >
              <MenuItem
                className={classes.menuItem}
                disabled
              >
                <div>
                  <div style={{ fontSize: 11 }}>Room Code</div>
                  <Typography color="secondary">{room || 'No room'}</Typography>
                </div>
              </MenuItem>
              {room && (
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => { }}
                >
                  Leave
                </MenuItem>
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
