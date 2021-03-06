const {createElement: e} = require('react')
const DeviceList = require('./device-list')
const MapList = require('./map-list')

module.exports = function Index (props) {
  return [
    e('div', {class: 'navbar'},
      e('h1', {class: 'navbar-title'},
        'Gramin MapInstall'
      ),
      e(DeviceList, {
        onChange: (id) => props.onDeviceSelect(id),
        selected: props.selectedDevice,
        devices: props.devices
      })
    ),
    e('div', {class: 'content'},
      e(MapList, {
        onInstallClick: (mapId) => props.onInstallClick(mapId),
        onStyleChange: (mapPath, stylePath) => props.onStyleChange(mapPath, stylePath),
        mapsInstalling: props.mapsInstalling,
        maps: props.maps,
        error: props.error,
        selectedStyles: props.selectedStyles
      })
    )
  ]
}
