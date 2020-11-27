import { appTypes, API } from './types'
import store from '../store'

const getData = () => ({
  type: API,
  api: {
    method: 'POST',
    url: '/session/get-all',
    onSuccess: (data) => store.dispatch({
      type: appTypes.setData,
      data,
    }),
    onError: () => { },
  },
})

const createRoom = (name) => ({
  type: API,
  api: {
    method: 'POST',
    url: '/session/create',
    data: {
      name,
    },
    onSuccess: (data) => store.dispatch({
      type: appTypes.setData,
      data,
    }),
    onError: () => { },
  },
})

const joinRoom = (name, room) => ({
  type: API,
  api: {
    method: 'POST',
    url: '/session/join',
    data: {
      name,
      room,
    },
    onSuccess: (data) => store.dispatch({
      type: appTypes.setData,
      data,
    }),
    onError: () => { },
  },
})

export {
  createRoom,
  joinRoom,
  getData,
}
