const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld(
   'app_api',
   {
      sendToMain: (data) => ipcRenderer.send('send-to-main', data),
      receiveFromMain: (handler) => ipcRenderer.on('receive-from-main', (event, data) => handler(data))
   }
);
