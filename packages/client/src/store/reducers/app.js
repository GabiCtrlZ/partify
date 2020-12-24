import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { appTypes } from '../actions/types'
import { COOKIE_NAME } from '../../consts'

const initialState = Immutable({
  room: '',
  name: 'Guest',
  role: 'user',
  songs: [],
  currentlyPlayingSong: {},
  fetchCompleted: false,
  suggestedSongs: [],
})

export default handleActions({
  [appTypes.getData]: (state, { data: { songs } }) => state.set('songs', songs),
  [appTypes.fetchCompleted]: (state) => state.set('fetchCompleted', true),
  [appTypes.setData]: (state, { data: { songs } }) => {
    try {
      const token = Cookies.get(COOKIE_NAME)
      const decoded = jwtDecode(token)
      const {
        name,
        role,
        roomId,
      } = decoded

      return state
        .set('songs', songs)
        .set('currentlyPlayingSong', songs.find(song => song.playing))
        .set('name', name)
        .set('room', roomId)
        .set('role', role)
        .set('fetchCompleted', true)
    }
    catch (e) {
      return state
    }
  },
  [appTypes.addSong]: (state, { data }) => state.set('songs', [...state.songs, data]),
  [appTypes.removeSong]: (state, { data }) => state.set('songs', state.songs.filter(({ uri }) => uri !== data)),
  [appTypes.setSuggested]: (state, { data: { songs } }) => state.set('suggestedSongs', songs),
  [appTypes.leave]: (state, payload) => { 
    Cookies.remove(COOKIE_NAME) 
    
    return state
      .set('room', '')
      .set('name', 'Guest')
      .set('role', 'user')
      .set('songs', [])
      .set('currentlyPlayingSong', {})
      .set('suggestedSongs', [])
  },
}, initialState)
