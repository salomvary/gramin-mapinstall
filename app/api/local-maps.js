const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const mapsFolder = path.join(process.env.HOME, 'Maps')

async function listMaps () {
  const names = await readdir(mapsFolder)
  return readChildren(mapsFolder, names)
}

async function readChildren (parent, names) {
  const children = names.map((name) => ({
    name,
    path: path.join(parent, name)
  }))

  const stats = await Promise.all(children.map(({path}) => stat(path)))

  return children
    .filter((child, i) => stats[i].isDirectory())
    .map((child, i) => Object.assign(child, {
      updated: stats[i].birthtime
    }))
}

module.exports = listMaps
