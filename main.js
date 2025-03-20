const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    })

    const isDev = process.env.NODE_ENV === 'development'

    if (isDev) {
        win.loadURL('http://localhost:5173')
        win.webContents.openDevTools()
    } else {
        win.loadFile('dist/index.html')
    }
}

function getJsonPath() {
    if (app.isPackaged) {
        return path.join(path.dirname(process.execPath), 'project.json')
    } else {
        return path.join(__dirname, 'project.json')
    }
}

const jsonFilePath = getJsonPath()
const defaultPath = path.join(__dirname, 'public/project.json')
if (!fs.existsSync(jsonFilePath)) {
    fs.copyFileSync(defaultPath, jsonFilePath)
}

function readFile() {
    if (!fs.existsSync(jsonFilePath)) {
        return {}
    }
    return JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'))
}

function writeFile(content) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(content))
}

ipcMain.handle('project:getAll', async () => {
    const content = await readFile()
    return content['projects']
})

ipcMain.handle('project:addNew', async (event, id) => {
    const content = await readFile()
    const projects = content['projects']
    const exist = projects.find(item => item.id === id)
    if (exist) {
        return exist
    }
    projects.push({
        id: id
    })
    content['projects'] = projects
    writeFile(content)
    return { id: id }
})

ipcMain.handle('project:get', async (event, id) => {
    const content = await readFile()
    return content['projects'].find(item => item.id === Number(id))
})

ipcMain.handle('project:save', async (event, project) => {
    const content = await readFile()
    const prevProjects = content['projects']
    content['projects'] = prevProjects.map(item => item.id === project.id ? project : item)
    writeFile(content)
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
