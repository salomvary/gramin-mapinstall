const Garmin = require('../app/api/garmin')

const garmin = new Garmin()

garmin.listDevices()
  .then((devices) => {
    console.log('listDevices', devices)
  })
  .catch((error) => {
    console.error('listDevices error', error)
  })

console.log('watching')

garmin.on('change', (devices) => {
  console.log('change', devices)
})

garmin.on('error', (error) => {
  console.error('error', error)
})
