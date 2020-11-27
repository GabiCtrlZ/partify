import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import { appTypes } from '../actions/types'

const initialState = Immutable({
  room: '',
  name: 'Guest',
  role: 'user',
  songs: [],
})

export default handleActions({
  [appTypes.getData]: (state, { data: { songs } }) => state.set('songs', songs),
}, initialState)
