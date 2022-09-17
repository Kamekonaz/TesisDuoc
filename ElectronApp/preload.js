const { contextBridge, ipcMain, ipcRenderer } = require("electron")

const indexBridge = require("./viewScripts/indexPreload")

//if (location.href.endsWith('login.html')){
    Bridge = indexBridge
//}

contextBridge.exposeInMainWorld('Bridge', Bridge)