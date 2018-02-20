const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const mapsFolder = path.join(process.env.HOME, 'Maps')

function listMaps () {
  return readdir(mapsFolder)
    .then((names) => readChildren(mapsFolder, names))
}

function readChildren (parent, names) {
  return Promise.all(names.map((name) => {
    const child = path.join(parent, name)
    return Promise.all([{name, path: child}, stat(child)])
  })).then((results) => {
    return results
      .filter(([result, stat]) => stat.isDirectory())
      .map(([result, stat]) => {
        return Object.assign(result, {updated: stat.birthtime})
      })
  })
}

module.exports = listMaps
