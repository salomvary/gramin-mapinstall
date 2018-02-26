const fs = require('fs')
const mkgmap = require('./mkgmap')
const path = require('path')
const {promisify} = require('util')
const tmp = require('tmp')

const tmpDir = promisify(tmp.dir)
const copyFile = promisify(fs.copyFile)

module.exports = async function installMap (map, outputDir) {
  const targetName = path.format({
    dir: outputDir,
    name: path.basename(map.path),
    ext: '.img'
  })
  const tmpOutput = await tmpDir({unsafeCleanup: true})
  const imgFile = await mkgmap(map.path, tmpOutput, {description: map.name})
  return copyFile(imgFile, targetName)
}
