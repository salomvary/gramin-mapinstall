'use strict'

const Path = require('path')
const { exec } = require('child_process')

const mkgmapBase = Path.join(__dirname, 'vendor/mkgmap-r3741')

module.exports = function(folder, {typ, description}) {

  // TODO do proper shell escaping and glob expansion
  const command = `
    java -Xmx2000M \\
    -cp "${mkgmapBase}/lib/*.jar" \\
    -jar "${mkgmapBase}/mkgmap.jar" \\
    --index \\
    --description="${description}" \\
    --series-name="${description}" \\
    --family-name="${description}" \\
    --output-dir="${folder}" \\
    --gmapsupp "${folder}"/*.img \\
    "${folder}/${typ}"
    `
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log(stdout)
      console.error(stderr)
      if (error)
        reject(error)
      else
        resolve(Path.join(folder, 'gmapsupp.img'))
    })
  })
}
