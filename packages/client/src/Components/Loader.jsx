/* eslint-disable max-len */
import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import { connect } from 'react-redux'
import { SemipolarLoading } from 'react-loadingg'

const useStyles = makeStyles(({ palette }) => ({
  overlay: {
    zIndex: 1,
    background: fade(palette.background.default, 0.8),
    backdropFilter: 'blur(1px)',
    color: palette.primary.dark,
  },
}), { name: 'Loader' })

function Loader(props) {
  const classes = useStyles(props)
  const { isLoading = false } = props
  return (
    <Backdrop open={isLoading} classes={{ root: classes.overlay }}>
      <SemipolarLoading />
    </Backdrop>
  )
}

export default connect(
  ({ app: { isLoading } }) => ({ isLoading }),
)(Loader)
