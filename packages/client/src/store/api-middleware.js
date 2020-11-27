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

    if (!success) throw Error(`got success false with api to: ${requestConfig.url}`)
    if (typeof onSuccess === 'function') {
      return onSuccess(data)
    }
    if (actionName) {
      playSnackbar(`${actionName} successful`, { variant: 'success' })
    }
  }
  catch (e) {
    if (typeof onError === 'function') {
      return onError(e)
    }
    playSnackbar('Something goes wrong..', { variant: 'error' })
    store.dispatch({ type: appTypes.backToState, state: stateBeforeAction })
  }
}
