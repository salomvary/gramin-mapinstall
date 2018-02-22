const {connect} = require('react-redux')
const Index = require('../components/index')
const {
  installMap,
  selectDevice
} = require('../actions')

const mapStateToProps = state => ({
  maps: state.maps,
  selectedDevice: state.selectedDevice,
  devices: state.devices
})

const mapDispatchToProps = dispatch => ({
  onDeviceSelect: id => dispatch(selectDevice(id)),
  onInstall: id => dispatch(installMap(id))
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
