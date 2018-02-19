const {createElement: e} = require('react')
const MapList = require('./map-list')

module.exports = function Index (props) {
  return e(MapList, {
    onInstallClick: (id) => props.onInstallClick(id),
    maps: props.maps,
    error: props.error
  })
}
