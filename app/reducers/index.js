const {INSTALL_MAP, RECEIVE_MAPS} = require('../constants/action-types')

const initialState = {
  maps: []
}

function app (state = initialState, action) {
  switch (action.type) {
    case INSTALL_MAP:
      return state
    case RECEIVE_MAPS:
      return Object.assign({}, state, {maps: action.maps})
    default:
      return state
  }
}

module.exports = app
