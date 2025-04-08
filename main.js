const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')
const STANDARD_FORMAT = 'YYYY-MM-DD HH:mm:ss'

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

ipcMain.handle('project:getLatest', async (event, number) => {
    const content = await readFile()
    const projects = content['projects']
    return projects.slice(0, number + 1)
})


ipcMain.handle('project:addNew', async (event, id) => {
    const content = await readFile()
    const projects = content['projects']
    const exist = projects.find(item => item.id === id)
    if (exist) {
        return exist
    }
    projects.push({
        id: id,
        createTime: dayjs().format(STANDARD_FORMAT),
        updateTime: dayjs().format(STANDARD_FORMAT),
    })
    projects.sort((a, b) => dayjs(b.updateTime, STANDARD_FORMAT).diff(dayjs(a.updateTime, STANDARD_FORMAT)))
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
    const exist = prevProjects.find(item => item.id === project.id)
    if (exist) {
        content['projects'] = prevProjects.map(item => item.id === project.id ? {
            ...project,
            updateTime: dayjs().format(STANDARD_FORMAT),
        } : item).sort((a, b) => dayjs(b.updateTime, STANDARD_FORMAT).diff(dayjs(a.updateTime, STANDARD_FORMAT)))
    } else {
        content['projects'] = [...prevProjects, project].sort((a, b) => dayjs(b.updateTime, STANDARD_FORMAT).diff(dayjs(a.updateTime, STANDARD_FORMAT)))
    }
    writeFile(content)
})

ipcMain.handle('project:delete', async (event, id) => {
    const content = await readFile()
    const prevProjects = content['projects']
    const toDeleteProject = prevProjects.find(item => item.id === id)
    if (toDeleteProject) {
        content['projects'] = prevProjects.filter(item => item.id !== id)
        if (content['trash']) {
            content['trash'].push(toDeleteProject)
        } else {
            content['trash'] = [toDeleteProject]
        }
    }
    writeFile(content)
})

ipcMain.handle('partner:getAll', async () => {
    const content = await readFile()
    return content['partners']
})

ipcMain.handle('partner:addNew', async (event, name) => {
    const content = await readFile()
    const prevPartners = content['partners']
    if (!prevPartners || prevPartners.length === 0) {
        content['partners'] = [name]
        writeFile(content)
        return [name]
    } else {
        const exist = prevPartners.find(item => item === name)
        if (exist) {
            return prevPartners
        } else {
            prevPartners.push(name)
            content['partners'] = prevPartners
            writeFile(content)
            return prevPartners
        }
    }
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
