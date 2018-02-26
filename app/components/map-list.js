const moment = require('moment')
const {createElement: e} = require('react')

module.exports = function MapList (props) {
  let rows
  let messages

  if (props.maps) {
    rows = props.maps.map(map => {
      const isInstalling = props.mapsInstalling.has(map.path)
      const button = e('button', {
        className: 'track-upload-button',
        onClick: () => props.onInstallClick(map.path),
        disabled: isInstalling,
        children: isInstalling ? 'Installing...' : 'Install'
      })
      return e('tr', {key: map.name},
        e('td', {className: ''}, map.name),
        e('td', {className: ''}, moment(map.updated).calendar()),
        e('td', {className: 'actions'}, button)
      )
    })
  } else if (props.error) {
    messages = e('div', {className: 'messages'},
      e('div', {
        className: 'message',
        children: props.error
      })
    )
  } else {
    messages = e('div', {className: 'messages'},
      e('div', {
        className: 'message',
        children: 'Loading maps…'
      })
    )
  }

  return (
    e('div', null,
      e('table', null,
        e('tbody', null, rows)),
      e('div', {className: 'messages'},
        messages))
  )
}
