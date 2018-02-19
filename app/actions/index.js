const ActionTypes = require('../constants/action-types')

const Actions = {
  installMap (mapId) {
    return {
      type: ActionTypes.INSTALL_MAP,
      mapId
    }
  }
}

module.exports = Actions
