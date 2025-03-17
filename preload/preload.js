const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('projectAPI', {
    getAll: () => ipcRenderer.invoke('project:getAll'),
    create: (id) => ipcRenderer.invoke('project:addNew', id)
})