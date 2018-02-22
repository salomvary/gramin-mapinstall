const {createElement: e} = require('react')

module.exports = function DeviceList ({devices, selected, onChange}) {
  const options = devices.map(({name, path}) =>
    e('option', {key: path, value: path}, name)
  )

  return (
    e('select', {
      value: selected || '',
      className: 'devices',
      onChange: (event) => onChange(event.target.value)
    }, options)
  )
}
