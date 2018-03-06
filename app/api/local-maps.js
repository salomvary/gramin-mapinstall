const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const defaultMapsFolder = path.join(process.env.HOME, 'Maps')

async function listMaps (mapsFolder = defaultMapsFolder) {
  const names = await readdir(mapsFolder)
  return readChildren(mapsFolder, names)
}

async function readChildren (parent, names) {
  const children = names.map((name) => ({
    name,
    path: path.join(parent, name)
  }))

  const stats = await Promise.all(children.map(({path}) => stat(path)))

  const maps = children
    .filter((child, i) => stats[i].isDirectory())
    .map((child, i) => Object.assign(child, {
      updated: stats[i].birthtime
    }))

  const styles = await Promise.all(maps.map(({path}) => listStyles(path)))

  return maps.map((map, i) => Object.assign(map, {
    styles: styles[i]
  }))
}

async function listStyles (mapPath) {
  const names = await readdir(mapPath)
  return names.filter(isStyle).map((name) => ({
    name: path.parse(name).name,
    path: name
  }))
}

function isStyle (name) {
  return path.parse(name).ext.toLowerCase() === '.typ'
}

module.exports = listMaps
