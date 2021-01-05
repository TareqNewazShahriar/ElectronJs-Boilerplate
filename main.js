const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow;

app.whenReady().then(() => {
   let promise = createWindow();

   promise.then(() =>
      mainWindow.webContents.send('receive-from-main', 'How are you Window?'));
});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit()
   }
});

app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});

ipcMain.on('send-to-main', (event, data) => {
   console.log('Data from index window', data);
});

function createWindow() {
   mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      show: true,
      webPreferences: {
         contextIsolation: true,
         preload: `${__dirname}/src/preload.js`
      }
   });

   let promise = mainWindow.loadURL(`file://${__dirname}/src/index.html`);
   return promise;
}