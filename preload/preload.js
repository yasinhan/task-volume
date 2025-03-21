const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('projectAPI', {
    getAll: () => ipcRenderer.invoke('project:getAll'),
    create: (id) => ipcRenderer.invoke('project:addNew', id),
    get: (id) => ipcRenderer.invoke('project:get', id),
    save: (project) => ipcRenderer.invoke('project:save', project),
})