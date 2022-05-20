// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const ipc = ipcMain

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // win.loadURL(`file://${__dirname}/index.html`);
  win.loadFile('index.html')
  win.setBackgroundColor('#343848')

  ipc.on('minimizeApp', () => {
    win.minimize()
  })

  ipc.on('maximizeRestoreApp', () => {
    if (win.isMaximized()) win.restore()
    else win.maximize()
  })

  ipc.on('closeApp', () => {
    win.close()
  })

  // win.webContents.openDevTools()

  win.on("maximize", () => {
    win.webContents.send("isMaximized")
  })
  win.on("unmaximize", () => {
    win.webContents.send("isRestored")
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
