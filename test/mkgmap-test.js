const assert = require('assert')
const fs = require('fs')
const mkgmap = require('../app/api/mkgmap')
const path = require('path')
const tmp = require('tmp')

describe('mkgmap integration', () => {
  const inputDir = path.join(__dirname, 'fixtures/monaco')
  let outputDir

  before((done) => {
    tmp.tmpName((err, path) => {
      if (err) throw err
      outputDir = path
      done()
    })
  })

  it('creates image', () => {
    const typ = 'style.typ'
    const description = 'Test Map'
    return mkgmap(inputDir, outputDir, {typ, description}).then(output => {
      assert.equal(output, `${outputDir}/gmapsupp.img`, 'path returned')
      assert.ok(fs.existsSync(output), `${output} exists`)
    })
  })
})
