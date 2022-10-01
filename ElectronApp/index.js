const { screen, app, BrowserWindow, ipcMain  } = require('electron');
const nunjucks = require('nunjucks')
const path = require("path")
const fs = require('fs')

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
    render('./views/login.html')
    // const html = nunjucks.render('./views/login.html', { foo: 'bar' });
	// win.loadURL('data:text/html;charset=utf-8,' + encodeURI(html));
    console.log("loaded entre comillas")
    //win.loadFile('./views/login.html')
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


function render(htmlPath, context={}){
    //nunjucks.configure('views', { autoescape: true });
    //nunjucks.configure({ autoescape: true });
    const html = nunjucks.render(htmlPath, context);
    const ola = fs.writeFileSync(html)
    console.log("login", ola)
    win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));

}