const {connect} = require('react-redux')
const Index = require('../components/index')
const {
  installMap,
  selectDevice
} = require('../actions')

const mapStateToProps = state => ({
  maps: state.maps,
  mapsInstalling: state.mapsInstalling,
  selectedDevice: state.selectedDevice,
  devices: state.devices
})

const mapDispatchToProps = dispatch => ({
  onDeviceSelect: id => dispatch(selectDevice(id)),
  onInstallClick: mapId => dispatch(installMap(mapId))
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
