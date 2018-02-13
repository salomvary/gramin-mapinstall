'use strict'

const promisify = require('promisify-node')
const { copy } = promisify(require('fs-extra'))
const getMap = require('./get-map')
const mkgmap = require('./mkgmap')
const Path = require('path')
const { tmpName } = promisify(require('tmp'))
const Zip = require('node-7z')

module.exports = function installMap(url, deviceFolder) {
  return getMapToTmp(url)
    .then(mapFile => extractMapToTmp(mapFile))
    .then(mapFolder => mkgmap(mapFolder, {typ: 'widemc.TYP', description: 'Test Map'}))
    .then(mapImage => copyToDevice(mapImage, deviceFolder))
}

function getMapToTmp(url) {
  return tmpName().then(mapFile => getMap(url, mapFile))
}

function extractMapToTmp(mapFile) {
  return tmpName().then(mapFolder => extractMap(mapFile, mapFolder))
}

function extractMap(mapFile, mapFolder) {
  return new Zip()
    .extractFull(mapFile, mapFolder)
    .then(() => mapFolder)
}

function copyToDevice(mapImage, deviceFolder) {
  const target = Path.join(deviceFolder, 'mtbmonaco.img')
  return copy(mapImage, target).then(() => target)
}
