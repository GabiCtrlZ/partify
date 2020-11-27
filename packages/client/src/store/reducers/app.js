import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { appTypes } from '../actions/types'

const initialState = Immutable({
  room: '',
  name: 'Guest',
  role: 'user',
  songs: [],
  suggestedSongs: [],
})

export default handleActions({
  [appTypes.getData]: (state, { data: { songs } }) => state.set('songs', songs),
  [appTypes.setData]: (state, { data: { songs } }) => {
    const token = Cookies.get('parify-app')
    const decoded = jwtDecode(token)
    const {
      name,
      role,
      room,
    } = decoded

    return state
      .set('songs', songs)
      .set('name', name)
      .set('room', room)
      .set('role', role)
  },
  [appTypes.setSuggested]: (state, { data: { songs } }) => state.set('suggestedSongs', songs),
}, initialState)
