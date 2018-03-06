const ActionTypes = require('../constants/action-types')
const localMaps = require('../api/local-maps')
const installMapApi = require('../api/install-map')

function installingMap (mapId) {
  return {
    type: ActionTypes.INSTALLING_MAP,
    mapId
  }
}

function installedMap (mapId) {
  return {
    type: ActionTypes.INSTALLED_MAP,
    mapId
  }
}

function receiveMaps (maps) {
  return {
    type: ActionTypes.RECEIVE_MAPS,
    maps
  }
}

function receiveDevices (devices) {
  return {
    type: ActionTypes.RECEIVE_DEVICES,
    devices
  }
}

function selectDevice (id) {
  return {
    type: ActionTypes.SELECT_DEVICE,
    id
  }
}

function selectStyle (mapPath, stylePath) {
  return {
    type: ActionTypes.SELECT_STYLE,
    mapPath,
    stylePath
  }
}

function loadMaps () {
  return dispatch => {
    return localMaps()
      .then((maps) => dispatch(receiveMaps(maps)))
  }
}

function installMap (mapId) {
  return (dispatch, getState) => {
    const {maps, devices, selectedDevice, selectedStyles} = getState()
    const map = maps.find((map) => map.path === mapId)
    const device = devices.find((device) => device.path === selectedDevice)
    const stylePath = map.styles.length === 1
      ? map.styles[0].path
      : selectedStyles[map.path]
    dispatch(installingMap(mapId))
    return installMapApi(map, stylePath, device.path)
      .then(() => dispatch(installedMap(mapId)))
  }
}

module.exports.installMap = installMap
module.exports.receiveMaps = receiveMaps
module.exports.loadMaps = loadMaps
module.exports.receiveDevices = receiveDevices
module.exports.selectDevice = selectDevice
module.exports.selectStyle = selectStyle
