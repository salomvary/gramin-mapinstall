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

function loadMaps () {
  return dispatch => {
    return localMaps()
      .then((maps) => dispatch(receiveMaps(maps)))
  }
}

module.exports.installMap = installMap
module.exports.receiveMaps = receiveMaps
module.exports.loadMaps = loadMaps
