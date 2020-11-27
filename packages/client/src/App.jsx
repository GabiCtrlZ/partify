import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Route, Switch } from 'react-router-dom'

import Loader from './Components/Loader'
import { setEnqueueSnackbar } from './lib/snackbar'
import MainRouter from './MainRouter'
import { getData } from './store/actions/app'

const useStyles = makeStyles({
  app: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  },
}, { name: 'App' })

function App(props) {
  const classes = useStyles(props)
  const { dispatch } = props
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fun = async () => {
      dispatch(getData())
    }
    fun()
  }, [])

  useEffect(() => {
    setEnqueueSnackbar(enqueueSnackbar)
  }, [enqueueSnackbar])

  return (
    <div className={classes.app}>
      <Switch>
        <Route path="/">
          <div className={classes.content}>
            <MainRouter />
          </div>
        </Route>
      </Switch>
      <Loader />
    </div>
  )
}

export default connect()(App)
