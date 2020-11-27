import React from 'react'
import {
  makeStyles,
} from '@material-ui/core'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  partifyButton: {
    alignSelf: 'flex-end',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  partifyButtonText: {
    display: 'inline-flex',
    alignItems: 'center',
    border: 0,
    minWidth: 300,
    justifyContent: 'center',
    borderRadius: 20,
    padding: '0 20px',
    fontFamily: 'Poppins,Rubik,sans-serif',
    fontSize: 17,
    lineHeight: 3.5,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    background: 'white',
    color: theme.palette.background.default,
    '&[aria-disabled="true"]': {
      background: theme.palette.grey[200],
      color: theme.palette.grey[400],
      cursor: 'default',
    },
  },
}), { name: 'PartifyButton' })

const classesPrefix = 'MuiButtonBase-root'

function PartifyButton(props) {
  const classes = useStyles()
  const {
    label,
    onClick,
  } = props

  return (
    <div className={classes.container}>
      <button
        type="button"
        onClick={onClick}
        className={`${classesPrefix} ${classes.partifyButton}`}
      >
        <span
          className={classes.partifyButtonText}
        >
          {label}
        </span>
      </button>
    </div>
  )
}

export default connect()(PartifyButton)
