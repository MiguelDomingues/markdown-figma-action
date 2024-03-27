const core = require('@actions/core')
const { getDownloadObject } = require('./utils')
const tc = require('@actions/tool-cache')
const path = require('path')
const fs = require('fs')

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
      toolName,
      toolName,
      version
    )
    core.debug(`Cache Path: ${cachedPath}`)
    const binPath = path.join(cachedPath, toolName)
    core.debug(`Binary Path: ${binPath}`)

    core.info(`Making ${toolName} binary executable`)
    fs.chmod(binPath, '755')

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
