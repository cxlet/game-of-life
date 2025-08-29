/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Ensure development tools only in development mode.
// Do not assign to process.env.NODE_ENV here; webpack defines it based on mode.

// Install `electron-debug` (optional)
try {
  require('electron-debug')({ showDevTools: true })
} catch (_) {
  // optional
}

// Vue Devtools: optional; extension installs are managed manually in modern setups

// Require `main` process to boot app
require('./index')
