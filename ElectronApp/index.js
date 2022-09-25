const { User } = require('discord.js');
const { screen, app, BrowserWindow, ipcMain  } = require('electron');
const path = require("path")

const createWindow = () => {
    //const size = screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
        x: 0,
        y: 0,
        minWidth: 1100,
        minHeight: 600,
        // width: size.width,
        // height: size.height,
        width: 1100,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js'),
        }
    });
    //win.removeMenu()
    win.loadFile('./views/login.html')
    ///win.loadFile('./views/adminDashboard.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

const UserManager = require('./managers/userManager');

ipcMain.on("login-clicked", async (event, data) => {  
    const login_result = await UserManager.login(data["inputUsername"], data["inputPassword"]);
    const test = await UserManager.get_users_by_usertype(2);
    console.log(test)
    console.log(login_result)
    if (!login_result["isUsernameCorrect"] || !login_result["isPasswordCorrect"]){
        win.webContents.send("login", undefined)
    }
    
    else{
        const userData = (await UserManager.getUserData(data["inputUsername"]))[0];
        if (userData["ID_TIPO"] == 1){
            console.log(userData)
            win.loadFile("./views/adminDashboard.html");
            win.webContents.on("did-finish-load", () => {
                win.webContents.send("loadData", userData);
            })
        }
        
    }

  });