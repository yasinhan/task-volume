const { app, BrowserWindow } = require('electron')
/** @type {import('electron').BrowserWindow} */
const path = require('path')


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        // webPreferences: {
        //     preload: path.join(__dirname, '../preload/preload.js'),
        // },
    })

    const isDev = process.env.NODE_ENV === 'development'

    if (isDev) {
        win.loadURL('http://localhost:5173')
        win.webContents.openDevTools()
    } else {
        win.loadFile('dist/index.html')
    }

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
