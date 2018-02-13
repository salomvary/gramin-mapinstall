'use strict'

const assert = require('assert')
const fs = require('fs')
const mkgmap = require('../app/mkgmap')
const ncp = require('ncp')
const Path = require('path')
const tmp = require('tmp')

describe('Mkgmap', function() {
  var input

  before(function(done) {
    tmp.tmpName(function(err, path) {
      if (err) throw err
      const source = Path.join(__dirname, 'fixtures/monaco')
      ncp(source, path, function(err) {
        if (err) throw err
        input = path
        done()
      })
    })
  })

  it('creates image', function() {
    const typ = 'style.typ'
    const description = 'Test Map'
    return mkgmap(input, { typ, description }).then(output => {
      assert.equal(output, `${input}/gmapsupp.img`, 'path returned')
      assert.ok(fs.existsSync(output), `${output} exists`)
    })
  })
})
