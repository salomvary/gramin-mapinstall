const {
  INSTALLING_MAP,
  INSTALLED_MAP,
  RECEIVE_DEVICES,
  RECEIVE_MAPS,
  SELECT_DEVICE
} = require('../constants/action-types')

const initialState = {
  maps: [],
  mapsInstalling: new Set(),
  selectedDevice: null,
  devices: []
}

function app (state = initialState, action) {
  switch (action.type) {
    case INSTALLING_MAP: {
      const mapId = action.mapId
      const mapsInstalling = new Set([mapId, ...state.mapsInstalling])
      return Object.assign({}, state, {mapsInstalling})
    }
    case INSTALLED_MAP: {
      const mapId = action.mapId
      const mapsInstalling = new Set(state.mapsInstalling)
      mapsInstalling.delete(mapId)
      return Object.assign({}, state, {mapsInstalling})
    }
    case RECEIVE_MAPS:
      return Object.assign({}, state, {maps: action.maps})
    case RECEIVE_DEVICES:
      const devices = action.devices
      const selectedFound = devices.some((device) =>
        device.path === state.selectedDevice
      )
      const selectedDevice = selectedFound
        ? state.selectedDevice
        : devices.length ? devices[0].path : null
      return Object.assign({}, state, {devices: action.devices, selectedDevice})
    case SELECT_DEVICE:
      return Object.assign({}, state, {selectedDevice: action.id})
    default:
      return state
  }
}

module.exports = app
