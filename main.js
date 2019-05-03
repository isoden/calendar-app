// @ts-check

const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

/** @type {BrowserWindow} */
let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL(isDev ? 'http://localhost:4200' : `file://${__dirname}/dist/calendar-app/index.html`)

  win.webContents.openDevTools()
  if (isDev) {
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
