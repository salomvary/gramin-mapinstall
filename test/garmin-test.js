const assert = require('assert')
const Garmin = require('../app/api/garmin')
const path = require('path')

describe('garmin integration', () => {
  const root = path.join(__dirname, 'fixtures/device/Volumes')
  let garmin

  after(() => {
    garmin.dispose()
  })

  before(() => {
    garmin = new Garmin(root)
  })

  it('listDevices returns all Garmin devices', () => {
    return garmin.listDevices().then((devices) => {
      assert.deepEqual(devices, [
        {
          name: 'GARMIN',
          path: path.join(__dirname, 'fixtures/device/Volumes/GARMIN')
        },
        {
          name: 'NO NAME',
          path: path.join(__dirname, 'fixtures/device/Volumes/NO NAME')
        }
      ])
    })
  })
})
