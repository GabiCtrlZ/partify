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
    onError: () => store.dispatch({
      type: appTypes.fetchCompleted,
    }),
  },
})

const pollSongs = () => ({
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

const createRoom = (name, roomSecret) => ({
  type: API,
  api: {
    method: 'POST',
    url: '/session/create',
    data: {
      name,
      roomSecret,
    },
    onSuccess: (data) => store.dispatch({
      type: appTypes.setData,
      data,
    }),
    onError: () => { },
  },
})

const joinRoom = (name, roomId) => ({
  type: API,
  api: {
    method: 'POST',
    url: '/session/join',
    data: {
      name,
      roomId,
    },
    onSuccess: (data) => store.dispatch({
      type: appTypes.setData,
      data,
    }),
    onError: () => { },
  },
})

const searchSongs = (searchVal) => ({
  type: API,
  api: {
    method: 'POST',
    url: '/songs/search',
    data: {
      searchVal,
    },
    onSuccess: (data) => store.dispatch({
      type: appTypes.setSuggested,
      data,
    }),
    onError: () => { },
  },
})

const addSong = (songUri, data, cb) => ({
  type: API,
  api: {
    method: 'POST',
    actionName: 'Added song',
    url: '/songs/add',
    data: {
      songUri,
    },
    onSuccess: () => {
      cb()
      store.dispatch({
        type: appTypes.addSong,
        data,
      })
    },
  },
})

const removeSong = (songUri, cb) => ({
  type: API,
  api: {
    actionName: 'Removed song',
    method: 'POST',
    url: '/songs/remove',
    data: {
      songUri,
    },
    onSuccess: () => {
      cb()
      store.dispatch({
        type: appTypes.removeSong,
        data: songUri,
      })
    },
  },
})

const leave = () => ({
  type: appTypes.leave,
})

export {
  createRoom,
  addSong,
  pollSongs,
  removeSong,
  joinRoom,
  getData,
  searchSongs,
  leave,
}
