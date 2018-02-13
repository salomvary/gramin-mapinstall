'use strict'

const { app, BrowserWindow } = require('electron')

var mainWindow = null

app.on('window-all-closed', function() {
  app.quit()
})

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    minWidth: 640,
    minHeight: 320,
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
