const {connect} = require('react-redux')
const Index = require('../components/index')
const {
  installMap,
  selectDevice,
  selectStyle
} = require('../actions')

const mapStateToProps = state => ({
  maps: state.maps,
  mapsInstalling: state.mapsInstalling,
  selectedDevice: state.selectedDevice,
  selectedStyles: state.selectedStyles,
  devices: state.devices
})

const mapDispatchToProps = dispatch => ({
  onDeviceSelect: id => dispatch(selectDevice(id)),
  onInstallClick: mapId => dispatch(installMap(mapId)),
  onStyleChange: (mapPath, stylePath) => dispatch(selectStyle(mapPath, stylePath))
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
