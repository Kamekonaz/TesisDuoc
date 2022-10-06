const { screen, app, BrowserWindow, ipcMain  } = require('electron');
const nunjucks = require('nunjucks')
const path = require("path")
const fs = require('fs-extra');
const loginCache = require('./cache.json')
const axios = require('axios');
const EXPECTED_USERS = [1]

const createWindow = async () => {
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
    await render('login.html')
    if (loginCache.username && loginCache.sessionKey){
        win.webContents.send("loginCache", {cacheUsername: loginCache.username})
    }

    console.log("Aplicacion iniciada")
}

app.whenReady().then(async () => {
    await createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

//const UserManager = require('./managers/userManager');

ipcMain.on("login-clicked", async (event, data) => {  
    let accountID = 0;
    try {
        //isCacheSesionValid = false
        const isCacheSesionValid = (await axios({
            method: 'post',
            url: 'http://localhost:3001/isSessionValid',
            data: {
                sessionKey: (loginCache.sessionKey) ? loginCache.sessionKey : ""
            }
        })).data["valid"];

        if (isCacheSesionValid
        && data["inputUsername"] == loginCache.username 
        && data["inputPassword"] == "default"){

            const login_result = (await axios({
                method: 'post',
                url: 'http://localhost:3001/keylogin',
                data: {
                sessionKey: loginCache.sessionKey,
                expectedUserTypes: EXPECTED_USERS
                }
            })).data;
            if (login_result["error"]) return win.webContents.send("login", undefined)
            accountID = login_result["accountID"]
        }
        else{
            const login_result = (await axios({
                method: 'post',
                url: 'http://localhost:3001/login',
                data: {
                username: data["inputUsername"],
                password: data["inputPassword"],
                expectedUserTypes: EXPECTED_USERS
                }
            })).data;
            //console.log("normal login",login_result)
            if (login_result["error"]) return win.webContents.send("login", undefined)

            accountID = login_result["accountID"]


            const sessionKeyCache = JSON.stringify({
                "username": data["inputUsername"],
                "sessionKey": login_result["sessionKey"]
            });
            await fs.writeFileSync('cache.json', sessionKeyCache);
    }
   
    const updatedLoginCache = require('./cache.json');
    const userData = (await axios({
        method: 'post',
        url: 'http://localhost:3001/getwholeuserdata',
        data: {
        sessionKey: updatedLoginCache.sessionKey,
        accountID: accountID
        }
    })).data;
    
    render("adminDashboard.html");
    win.webContents.on("did-finish-load", () => {
        win.webContents.send("loadData", { ...userData, sessionKey: updatedLoginCache.sessionKey } );
    })

    } catch (error) {
        console.log(error)
        win.webContents.send("login", undefined)
    }
  });

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


