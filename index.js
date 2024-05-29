'use strict'

import { app, BrowserWindow } from 'electron'

// const isDevelopment = process.env.NODE_ENV !== 'production'
const isDevelopment = false // false:正式(控制台调试)

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    autoHideMenuBar: true // 这个属性将隐藏菜单栏
  })

  if (isDevelopment) {
    window.webContents.openDevTools()
  }
  
  window.loadURL('https://oa.dx-src.com/')

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})