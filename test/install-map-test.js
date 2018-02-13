'use strict'

const assert = require('assert')
const fs = require('fs')
const installMap = require('../app/install-map')
const promisify = require('promisify-node')
const { tmpName } = promisify(require('tmp'))

const url = 'ftp://ftp5.gwdg.de/pub/misc/openstreetmap/openmtbmap/odbl/mtbmonaco.exe'

describe('Install map', function() {
  before(function() {
    return tmpName().then(deviceFolder => {
      this.deviceFolder = deviceFolder
    })
  })

  it('installs map image to the device', function() {
    return installMap(url, this.deviceFolder)
      .then(deviceImage => {
        assert.equal(deviceImage, `${this.deviceFolder}/mtbmonaco.img`, 'path returned')
        assert.ok(fs.existsSync(deviceImage), `${deviceImage} exists`)
      })
  })
})
