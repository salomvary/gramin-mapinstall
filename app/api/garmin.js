const Events = require('events')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

module.exports = class Garmin extends Events {
  constructor (root = getVolumes()) {
    super()
    this.root = root
    this.watcher = fs.watch(root, () => this.onChange())
  }

  dispose () {
    this.watcher.close()
  }

  async listDevices () {
    const paths = await findDevices(this.root)
    return paths.map((devicePath) => ({
      name: path.basename(devicePath),
      path: devicePath
    }))
  }

  onChange () {
    this.listDevices()
      .then((devices) => this.emit('change', devices))
      .catch((error) => this.emit('error', error))
  }
}

async function findDevices (root) {
  const mounts = await ls(root)
  const isGarmins = await Promise.all(mounts.map(retryIsGarmin))
  return mounts.filter((mounts, i) => isGarmins[i])
}

async function retryIsGarmin (mount) {
  // For some reason permissions are not set up right after a device is connected
  return retry(() => isGarmin(mount), 10, e => e.code === 'EACCES')
}

async function isGarmin (mount) {
  return containsChild(mount, 'Garmin')
}

async function containsChild (parent, child) {
  const parentStat = await stat(parent)
  if (parentStat.isDirectory()) {
    const children = await ls(parent)
    return children.some(entry => path.basename(entry) === child)
  }
  return false
}

async function ls (dir) {
  return readdir(dir)
    .then((entries) =>
      entries.map(entry => path.join(dir, entry))
    )
}

function retry (fn, count, isRetriable) {
  return fn().catch(e => {
    if (count > 0 && isRetriable(e)) {
      return sleep(100, () => retry(fn, count - 1, isRetriable))
    } else {
      return e
    }
  })
}

function sleep (time, fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn().then(resolve, reject)
    }, time)
  })
}

function getVolumes () {
  if (process.platform === 'darwin') {
    return '/Volumes'
    // return path.join(__dirname, '../../test/fixtures/device/Volumes')
  } else {
    return '/media/' + process.env.USER
  }
}
