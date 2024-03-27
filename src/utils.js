const os = require('os')

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [osx, linux, windows]
function mapOS(osv) {
  const mappings = {
    darwin: 'osx',
    win32: 'windows'
  }
  return mappings[osv] || osv
}

function getDownloadObject(version) {
  const platform = os.platform()
  const filename = `markdown-figma-${mapOS(platform)}`
  const extension = platform === 'win32' ? '.exe' : ''
  const binPath = `${filename}${extension}`
  const url = `https://github.com/MiguelDomingues/markdown-figma/releases/download/v${version}/${filename}${extension}`
  return {
    url,
    binPath
  }
}
module.exports = { getDownloadObject }
