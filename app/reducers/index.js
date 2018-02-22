const {
  INSTALL_MAP,
  RECEIVE_DEVICES,
  RECEIVE_MAPS,
  SELECT_DEVICE
} = require('../constants/action-types')

const initialState = {
  maps: [],
  selectedDevice: null,
  devices: []
}

function app (state = initialState, action) {
  switch (action.type) {
    case INSTALL_MAP:
      return state
    case RECEIVE_MAPS:
      return Object.assign({}, state, {maps: action.maps})
    case RECEIVE_DEVICES:
      return Object.assign({}, state, {devices: action.devices})
    case SELECT_DEVICE:
      return Object.assign({}, state, {selectedDevice: action.id})
    default:
      return state
  }
}

module.exports = app
