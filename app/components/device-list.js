const {createElement: e} = require('react')

const noDevice = e('option', null, 'No Device')

module.exports = function DeviceList ({devices, selected, onChange}) {
  const options = devices.length > 0 ? devices.map(({name, path}) =>
    e('option', {key: path, value: path}, name)
  ) : noDevice

  return (
    e('select', {
      value: selected || '',
      disabled: devices.length < 1,
      className: 'devices',
      onChange: (event) => onChange(event.target.value)
    }, options)
  )
}
