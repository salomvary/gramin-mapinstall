const path = require('path')
const {promisify} = require('util')
const childProcesss = require('child_process')
const glob = promisify(require('glob'))

const execFile = promisify(childProcesss.execFile)

const mkgmapBase = path.join(__dirname, '../vendor/mkgmap-r4125')

module.exports = async function mkgmap (inputDir, outputDir, {typ = null, description}) {
  const command = 'java'

  const args = [
    '-Xmx2000M',
    // '-cp', path.join(mkgmapBase, 'lib/*.jar'),
    '-jar', path.join(mkgmapBase, 'mkgmap.jar'),
    '--index',
    '--verbose',
    `--description=${description}`,
    `--series-name=${description}`,
    `--family-name=${description}`,
    `--output-dir=${outputDir}`,
    '--gmapsupp'
  ]

  // Add images
  const imgs = await glob(path.join(inputDir, '*.img'), {nocase: true})
  args.splice(args.length, 0, ...imgs)

  // Add optional TYP file
  if (typ) {
    args.push(path.join(inputDir, typ))
  }

  // Execute mkgmap
  console.log(`Executing ${command} ${args.join(' ')}`)
  const {stdout, stderr} = await execFile(command, args)
  console.log(stdout)
  console.error(stderr)

  // Return the path to the Garmin image
  return path.join(outputDir, 'gmapsupp.img')
}
