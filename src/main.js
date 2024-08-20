/*eslint space-before-function-paren: 1*/

const core = require('@actions/core')
const { getDownloadObject } = require('./utils')
const tc = require('@actions/tool-cache')
const path = require('path')
const exec = require('@actions/exec')
const os = require('os')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const version = core.getInput('version')
    core.info(`Version: ${version}`)

    // Download the specific version of the tool
    const download = getDownloadObject(version)
    core.info(`Downloading: ${download.url}`)
    const downloadPath = await tc.downloadTool(download.url)

    const toolName = `markdown-figma`
    const cachedPath = await tc.cacheFile(
      downloadPath,
      `${toolName}${download.extension}`,
      toolName,
      version
    )
    core.debug(`Cache Path: ${cachedPath}`)
    const binPath = path.join(cachedPath, `${toolName}${download.extension}`)
    core.debug(`Binary Path: ${binPath}`)

    if (os.platform() !== 'win32') {
      core.info(`Making ${toolName}${download.extension} binary executable`)
      await exec.exec('chmod', ['+x', binPath])
    }

    core.info(`Adding ${cachedPath} to path`)
    core.addPath(cachedPath)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
