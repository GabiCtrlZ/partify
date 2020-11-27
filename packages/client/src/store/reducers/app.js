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
  suggestedSongs: [],
})

export default handleActions({
  [appTypes.getData]: (state, { data: { songs } }) => state.set('songs', songs),
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
        .set('name', name)
        .set('room', roomId)
        .set('role', role)
    }
    catch (e) {
      return state
    }
  },
  [appTypes.setSuggested]: (state, { data: { songs } }) => state.set('suggestedSongs', songs),
}, initialState)
