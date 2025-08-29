'use strict'

const { contextBridge, shell } = require('electron')

contextBridge.exposeInMainWorld('api', {
  openExternal: (url) => {
    if (typeof url === 'string') {
      shell.openExternal(url)
    }
  }
})

contextBridge.exposeInMainWorld('env', {
  versions: process.versions,
  platform: process.platform
})
