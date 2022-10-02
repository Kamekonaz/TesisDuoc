const { screen, app, BrowserWindow, ipcMain  } = require('electron');
const nunjucks = require('nunjucks')
const path = require("path")
const fs = require('fs-extra');





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
            //partition: 'persist:someName',
            //enableRemoteModule: true,
            preload: path.join(__dirname, './preload.js')
        }
    }); 
    //win.removeMenu()
    render('login.html')

    console.log("loaded entre comillas")
}

app.whenReady().then(async () => {
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
        
    }
    
    else{
        const userData = (await UserManager.getUserData(data["inputUsername"]))[0];
        if (userData["ID_TIPO"] == 1){
            console.log(userData)
            render("adminDashboard.html");
            win.webContents.on("did-finish-load", () => {
                win.webContents.send("loadData", userData);
            })
        }
        else{
            win.webContents.send("login", undefined)
        }
        
    }

  });

//   ipcMain.on("changeDashboardOption", async (event, data) =>{
//     render("adminDashboard.html");
//     win.webContents.on("did-finish-load", () => {
//         win.webContents.send("loadData", data);
//     })
//   })



  async function render(template, context = {}){
    cacheFile = "views/Cache.html"
    async function writeCache(s){    
        fs.writeFileSync(cacheFile, s, 'utf8', function (err) {
            if (err) return console.log(err);
        })
    }
    const universalContext = {
    }

    const html = await nunjucks.render("views/"+template, context + universalContext);
    writeCache(html)
    await win.loadFile(cacheFile)
    writeCache(" ")
}


