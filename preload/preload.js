const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('projectAPI', {
    getAll: () => ipcRenderer.invoke('project:getAll'),
    getLatest: (number) => ipcRenderer.invoke('project:getLatest', number),
    create: () => ipcRenderer.invoke('project:addNew'),
    get: (id) => ipcRenderer.invoke('project:get', id),
    save: (project) => ipcRenderer.invoke('project:save', project),
    delete: (id) => ipcRenderer.invoke('project:delete', id),
})

contextBridge.exposeInMainWorld('partnerAPI', {
    getAll: () => ipcRenderer.invoke('partner:getAll'),
    create: (name) => ipcRenderer.invoke('partner:addNew', name),
})