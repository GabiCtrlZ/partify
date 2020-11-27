import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store'
import theme from './lib/theme'
import App from './App'
import Snackbar from './Components/Snackbar'

function AppProviders() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar>
          <Router>
            <App />
          </Router>
        </Snackbar>
      </MuiThemeProvider>
    </Provider>
  )
}

export default AppProviders
