const { Console } = require('console');
const express = require('express');
const app = express();
var https = require('https');
const PORT = 3001;
const BdManager = require('./bd_manager')

app.use(express.json())
//app.use(express.urlencoded());


// app.get('/holamundo', (req, res) =>{
//     res.status(200).send({
//         hola: 'mundo'
//     })
// });

app.post('/editUser', async (req, res) =>{
    const { f_accountID, f_image, 
        f_username, f_nombres, f_apellidos, 
        f_email, f_telefono, f_estado } = req.body

    await BdManager.updateUserData(f_accountID, f_image, 
        f_username, f_nombres, f_apellidos, 
        f_email, f_telefono, f_estado)


    res.send({
        result: "done"
    })
       
})


app.post('/login', async(req, res) =>{
    const { username, password, expectedUserTypes } = req.body
    console.log(username, password, expectedUserTypes)
    const result = await BdManager.login(username, password);

    if (!result["isUsernameCorrect"] || !result["isPasswordCorrect"]){             
        return res.send({ error: 'Credenciales incorrectas' })
    }
    else{
        const userData = await BdManager.getUserDataByUsername(username);
        //console.log(userData)
        if (!expectedUserTypes.includes(userData["ID_TIPO"])){
            console.log(expectedUserTypes, " | " , userData["ID_TIPO"] )
            return res.send({ error: 'Credenciales incorrectas' })
        }
        
        const sessionKey = await BdManager.createSession(userData["ID_CUENTA"])
        console.log(sessionKey)

        res.send({
            accountID: userData["ID_CUENTA"],
            sessionKey: sessionKey["sessionKey"]
        });
    }   
})

app.post('/isSessionValid', async(req, res) =>{
    console.log(req.body)
    const { sessionKey } = req.body

    
    const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)

    console.log(sessionKey)

    res.send({
        //valid: false
        valid: (accountID != 0) ? true : false
    })
    
})

app.post('/keylogin', async (req, res) =>{
    const { sessionKey, expectedUserTypes } = req.body

    
    const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    const userData = await BdManager.getUserDataById(accountID);

    if (!sessionKey || !expectedUserTypes.includes(userData["ID_TIPO"])){             
        res.status(418).send({ error: 'error' })
    }
    else{
        res.send({
            accountID: accountID
        })
    }   
})


app.post('/getwholeuserdata', async (req, res) =>{
    const { accountID, sessionKey } = req.body
    
    const signedUserAccountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    if (signedUserAccountID == 0) return { error: "Ha ocurrido un error" }

    const signedUserData = await BdManager.getUserDataById(signedUserAccountID);
    const targetUserData = await BdManager.getUserDataById(accountID);
    //console.log(targetUserData)

    switch (signedUserData["ID_TIPO"]){
        // Admin
        case 1:
            return res.send(targetUserData)
            break;

        // Profesional
        case 2:
            // Solo puede tomarse a si mismo 
            if(signedUserAccountID == accountID) return res.send(targetUserData)
            return { error: "Ha ocurrido un error" }
            break;

        // Cliente
        case 3:
            // Solo puede tomarse a si mismo 
            if(signedUserAccountID == accountID) return res.send(targetUserData)
            return { error: "Ha ocurrido un error" }
            break;
        } 
})


app.post('/listUsersByUserType', async (req, res) =>{
    const { usertype, sessionKey } = req.body
    
    const signedUserAccountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    if (signedUserAccountID == 0) return { error: "Ha ocurrido un error" }

    const signedUserData = await BdManager.getUserDataById(signedUserAccountID);
    const targetUsersData = await BdManager.get_users_by_usertype(usertype);

    switch (signedUserData["ID_TIPO"]){
        // Admin
        case 1:
            return res.send(targetUsersData)
            break;

        // Profesional
        case 2:
            // No puede obtener información de otros usuarios 
            return { error: "Ha ocurrido un error" }
            break;

        // Cliente
        case 3:
            // No puede obtener información de otros usuarios
            return { error: "Ha ocurrido un error" }
            break;
        } 
})


app.listen(
    PORT,
    () => console.log(`Api corriendo en http://localhost:${PORT}`)
);