const {connect} = require('react-redux')
const Index = require('../components/index')
const {installMap} = require('../actions')

const mapStateToProps = state => ({
  maps: state.maps
})

const mapDispatchToProps = dispatch => ({
  onInstall: id => dispatch(installMap(id))
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
