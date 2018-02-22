const ActionTypes = require('../constants/action-types')
const localMaps = require('../api/local-maps')

function installMap (mapId) {
  return {
    type: ActionTypes.INSTALL_MAP,
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

function loadMaps () {
  return dispatch => {
    return localMaps()
      .then((maps) => dispatch(receiveMaps(maps)))
  }
}

module.exports.installMap = installMap
module.exports.receiveMaps = receiveMaps
module.exports.loadMaps = loadMaps
module.exports.receiveDevices = receiveDevices
module.exports.selectDevice = selectDevice
