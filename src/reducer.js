import {Map, fromJS} from 'immutable'

export default function gridDataReducer (state = Map(), action) {
  switch (action.type) {
    case 'DATA_LOADING':
      return state.deleteIn(['GRID_DATA'])
        .setIn(['GRID_DATA', 'loading'], action.loading)
    case 'GRID_DATA':
      return state.setIn(['GRID_DATA', 'data'], fromJS(action.score))
        .setIn(['GRID_DATA', 'loading'], action.loading)
    case 'DATA_ERROR':
      return state.setIn(['GRID_DATA', 'error'], fromJS(action.error))
        .setIn(['GRID_DATA', 'loading'], action.loading)
    default:
      return state
  }
}
