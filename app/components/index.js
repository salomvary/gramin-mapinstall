const {createElement: e} = require('react')
const DeviceList = require('./device-list')
const MapList = require('./map-list')

module.exports = function Index (props) {
  return [
    e(DeviceList, {
      onChange: (id) => props.onDeviceSelect(id),
      selected: props.selectedDevice,
      devices: props.devices
    }),
    e(MapList, {
      onInstallClick: (id) => props.onInstallClick(id),
      maps: props.maps,
      error: props.error
    })]
}
