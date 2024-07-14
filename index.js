const { app, BrowserWindow, ipcMain,Tray, Menu} = require('electron')
const path = require("path")
const test = require('./test.js')
const gotTheLock = app.requestSingleInstanceLock()
let myWindow = null
if (!gotTheLock) {
  app.exit()
}

app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (myWindow) {
        myWindow.show()
        if (myWindow.isMinimized()) myWindow.restore()
        myWindow.focus()
    }
})

app.on('ready', () => {
    console.log(__dirname)
    const iconPath = path.join(__dirname, './src/img/icon.png')
    const mainWindow = new BrowserWindow({
        resizable: false,
        width: 800,
        height: 600,
        icon: iconPath,
        autoHideMenuBar:true,
        webPreferences: {
            backgroundThrottling: false,
            nodeIntegration: true,
            contextIsolation: false
            //  preload: path.join(__dirname, './preload.js')
        }
    })
    myWindow = mainWindow
    mainWindow.on('close', (e)=>{
        mainWindow.hide();
        e.preventDefault();
    })
    //mainWindow.webContents.openDevTools()
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg)
        event.sender.send('asynchronous-reply', 'pong')
      })
    ipcMain.on('start', (event, arg) => {
        test.start();
    })
    ipcMain.on('stop', (event, arg) => {
        test.stop();
    })
    mainWindow.loadFile('./src/main.html')

    tray = new Tray(iconPath)

    tray.setToolTip('Tasky')

    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            mainWindow.show()
        }
    })

    tray.on('right-click', () => {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.exit()
            }
        ])
        tray.popUpContextMenu(menuConfig)
    })
    

})
