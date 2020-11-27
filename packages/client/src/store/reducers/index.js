import { combineReducers } from 'redux'
import app from './app'
import { appTypes } from '../actions/types'

const reducers = combineReducers({
  app,
})

export default (state, action) => {
  if (action.type === appTypes.backToState) return action.state
  return reducers(state, action)
}
