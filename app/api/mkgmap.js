const path = require('path')
const {exec} = require('child_process')

const mkgmapBase = path.join(__dirname, '../vendor/mkgmap-r4125')

module.exports = function mkgmap (inputDir, outputDir, {typ = null, description}) {
  // TODO do proper shell escaping and glob expansion
  const command = `
    java -Xmx2000M \\
    -cp "${mkgmapBase}/lib/*.jar" \\
    -jar "${mkgmapBase}/mkgmap.jar" \\
    --index \\
    --verbose \\
    --description="${description}" \\
    --series-name="${description}" \\
    --family-name="${description}" \\
    --output-dir="${outputDir}" \\
    --gmapsupp \\
    "${inputDir}"/*.img`
  // "${inputDir}/${typ}"

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log(stdout)
      console.error(stderr)
      if (error) {
        reject(error)
      } else {
        resolve(path.join(outputDir, 'gmapsupp.img'))
      }
    })
  })
}
