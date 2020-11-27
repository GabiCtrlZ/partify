import { appTypes, API } from './types'
import store from '../store'

const toggleLoading = () => ({
  type: appTypes.toggleLoading,
})

const getData = () => ({
  type: API,
  api: {
    method: 'POST',
    url: '/session/get-all',
    onSuccess: (data) => store.dispatch({
      type: appTypes.getData,
      data,
    }),
    onError: () => { },
  },
})

export {
  toggleLoading,
  getData,
}
