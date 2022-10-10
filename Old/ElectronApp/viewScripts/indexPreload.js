const { contextBridge, ipcMain, ipcRenderer } = require("electron")


let indexBridge = {
    login: (callback) => ipcRenderer.on("login", (callback)),
    loginCache: (callback) => ipcRenderer.on("loginCache", (callback)),
    loadData: (callback) => ipcRenderer.on("loadData", (callback)),
    send: (channel, payload) => ipcRenderer.send(channel, payload)
}

contextBridge.exposeInMainWorld("indexBridge", indexBridge)