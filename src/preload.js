const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld(
   'app_api',
   {
      sendToMain: (data) => ipcRenderer.send('to-main', data),
      receiveFromMain: (handler) => ipcRenderer.on('to-window', (event, data) => handler(data))
   }
);
