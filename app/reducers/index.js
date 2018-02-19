const {INSTALL_MAP} = require('../constants/action-types')

const initialState = {
  maps: [
    {id: 1, title: 'Test Map One'},
    {id: 2, title: 'Test Map Two'}
  ]
}

function app (state = initialState, action) {
  switch (action.type) {
    case INSTALL_MAP:
      return state
    default:
      return state
  }
}

module.exports = app
