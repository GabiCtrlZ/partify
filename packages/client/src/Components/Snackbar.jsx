import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'

const useStyles = makeStyles(({ palette }) => ({
  successSnackbar: {
    background: palette.primary.dark,
  },
}), { name: 'Snackbar' })

function Snackbar(props) {
  const classes = useStyles(props)
  const { children } = props
  return (
    <SnackbarProvider maxSnack={3} classes={{ variantSuccess: classes.successSnackbar }}>
      {children}
    </SnackbarProvider>
  )
}

export default Snackbar
