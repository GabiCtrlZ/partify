import axios from 'axios'
import { playSnackbar } from '../lib/snackbar'
import store from './store'
import { appTypes } from './actions/types'

export default () => (next) => async (action) => {
  if (!action.api) return next(action)

  const {
    onSuccess,
    onError,
    actionName,
    method = 'POST',
    ...requestConfig
  } = action.api

  const stateBeforeAction = store.getState()

  if (!onSuccess) next(action)

  try {
    const {
      data: {
        success,
        data,
      },
    } = await axios({
      ...requestConfig,
      method,
      timeout: 300000,
      baseURL: '/api/v1',
    })

    if (!success) {
      playSnackbar('Something went wrong..', { variant: 'error' })
      throw Error(`got success false with api to: ${requestConfig.url}`)
    }
    if (actionName) {
      playSnackbar(`${actionName} successful`, { variant: 'success' })
    }
    if (typeof onSuccess === 'function') {
      return onSuccess(data)
    }
  }
  catch (e) {
    if (typeof onError === 'function') {
      return onError(e)
    }
    playSnackbar('Something went wrong..', { variant: 'error' })
    store.dispatch({ type: appTypes.backToState, state: stateBeforeAction })
  }
}
