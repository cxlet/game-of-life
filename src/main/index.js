'use strict'

import { app, BrowserWindow } from 'electron'
import path from 'path'
import fs from 'fs'
import { format as formatUrl } from 'url'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : formatUrl({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  })

function createWindow () {
  /**
   * Initial window options
   */
  // Prefer compiled preload in dist/electron during development
  let preloadPath = path.join(app.getAppPath(), 'dist/electron/preload.js')
  if (!fs.existsSync(preloadPath)) {
    preloadPath = path.resolve(__dirname, 'preload.js')
  }
  // eslint-disable-next-line no-console
  console.log('[main] preload path:', preloadPath)
  mainWindow = new BrowserWindow({
    height: 1600,
    useContentSize: true,
    width: 2560,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
