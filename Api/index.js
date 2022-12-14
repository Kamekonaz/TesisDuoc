const { Console } = require('console');
const express = require('express');
const app = express();
var https = require('https');
const PORT = 3001;
const BdManager = require('./bd_manager')

const bodyParser = require('body-parser')
const TransbankController = require('./TransbankControler')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
    next();
    }
    };
    
app.use(allowCrossDomain);
app.use(bodyParser.json({limit: '50mb'})) // handle json data
app.use(bodyParser.urlencoded({ extended: true, limit:"50mb" })) // handle URL-encoded data


app.post('/getClientsWithContract', BdManager.get_clients_with_contract)
app.post('/changeContractStatus', BdManager.change_contract_status)
app.post('/getPayments', BdManager.get_payments)
app.post('/getDetailByRut', BdManager.get_detail_by_rut)
app.post('/getBoletaDetails', BdManager.get_detalle_boleta)
app.post('/makeChecklist', BdManager.create_checklist)
app.post('/getChecklists', BdManager.get_checklists_visitas)
app.post('/editCheckbox', BdManager.edit_checkbox)
app.post('/crearPlanMejora', BdManager.crear_plan_mejora)
app.post('/getPlanes', BdManager.get_planes)
app.post('/editPlan', BdManager.edit_plan)

app.post('/solicitarAsesoria', BdManager.solicitar_asesoria_especial)
app.post('/editarSolicitudAsesoria', BdManager.editar_solicitud_asesoria)
app.post('/getSolicitudesAsesoria', BdManager.listar_solicitudes_asesoria)


app.post('/list_chats', BdManager.listar_chats)
app.post('/sendMessage', BdManager.enviar_mensaje)

app.post('/get_accidentes', BdManager.get_accidentes)


app.post('/creteBussiness', BdManager.createBussiness)





//app.use(cors())
//app.use(express.urlencoded());


// app.get('/holamundo', (req, res) =>{
//     res.status(200).send({
//         hola: 'mundo'
//     })
// });

app.post('/deleteUser', async (req, res) =>{
    try {
        const { accountID, sessionKey } = req.body

        const signedUserID = await BdManager.get_accountID_by_sessionKey(sessionKey)
        const userData = await BdManager.getUserDataById(signedUserID);

        if(userData["ID_TIPO"] != "1") res.send({ error: "No es admin"})

        await BdManager.deleteUser(accountID)

        res.send({
            result: "done"
        })
        
    } catch (error) {
        res.send({
            error: "Algo salio mal"
        })
    }
    
       
})

app.post("/pagar", TransbankController.doPayment);
app.post("/verificar", TransbankController.verifyPayment);
app.post('/anular', TransbankController.refundPayment);


app.post('/self_contract_info', async (req, res) =>{
    try {
        const { sessionKey } = req.body


        const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
        const userData = await BdManager.getUserDataById(accountID);

        if(userData["ID_TIPO"] != "3") res.send({ error: "Usuario incorrecto"})

        const result = await BdManager.get_contract_info(userData["RUT_USUARIO"])


        res.send(result)
    } catch (error) {
        res.send({
            result: "error"
        })  
    }
       
})

app.post('/report_accident', async (req, res) =>{
    try {
        const { rut_usuario, descripcion, asunto, sessionKey } = req.body


        const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
        const userData = await BdManager.getUserDataById(accountID);

        if(userData["ID_TIPO"] != "3") res.send({ error: "Usuario incorrecto"})

        await BdManager.report_accident(rut_usuario, descripcion, asunto)

        res.send({
            result: "done"
        })
    } catch (error) {
        res.send({
            result: "error"
        })  
    }
       
})

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

app.post('/crearCapacitacion', async (req, res) =>{
    const { descripcion, material, fecha, rut_usuario, rut_profesional, sessionKey } = req.body

    const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    const userData = await BdManager.getUserDataById(accountID);

    if(userData["ID_TIPO"] != "2") res.send({ error: "Usuario incorrecto"})

    await BdManager.crearCapacitacion(descripcion, material, fecha, rut_usuario, rut_profesional)


    res.send({
        result: "done"
    })
       
})

app.post('/crearVisita', async (req, res) =>{
    const { fecha, rut_usuario, rut_profesional, sessionKey, id_checklist } = req.body


    const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    const userData = await BdManager.getUserDataById(accountID);

    //if(userData["ID_TIPO"] != "2") res.send({ error: "Usuario incorrecto"})

    await BdManager.crearVisita(fecha, rut_usuario, rut_profesional, id_checklist)


    res.send({
        result: "done"
    })
       
})

app.post('/crearAsesoria', async (req, res) =>{
    const { especial, fecha, rut_usuario, rut_profesional, sessionKey } = req.body

    const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    const userData = await BdManager.getUserDataById(accountID);
   

    //if(userData["ID_TIPO"] != "2") res.send({ error: "Usuario incorrecto"})

    await BdManager.crearAsesoria(especial, fecha, rut_usuario, rut_profesional)


    res.send({
        result: "done"
    })
       
})

app.post('/createUser', async (req, res) =>{
    try {
        
        const { imagePFP,  usertype, estado, rut, username, contrase??a, nombres, apellidos, email, telefono, sessionKey } = req.body



        const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
        const userData = await BdManager.getUserDataById(accountID);

        if(userData["ID_TIPO"] != "1") res.send({ error: "No es admin"})

        await BdManager.createUser(imagePFP,  usertype, estado, rut, username, contrase??a, nombres, apellidos, email, telefono)


        res.send({
            result: "done"
        })
    } catch (error) {
        res.send({ error: "No es admin"})    
    }
       
})


// 1) Optimizar funci??n de login, pedir llave de sesi??n y retornar si la sesi??n es v??lida y una llave en caso de serlo.

// 2) Crear una funci??n de carga de datos tras login utilizando la llave de sesi??n como parametro
// app.get('/test', async(req,res) =>{
//     const defaultData = {
//         username: "",
//         sessionKey: "",
//         wasSessionValid: false,
//         accountID: 0,
//         loginSuccesful: false,
//         apiError: false,
//     }

//     const returningData = defaultData + {}

//     returningData.username = "awa";

//     console.log(defaultData)
// })

app.post('/login', async(req, res) =>{
    const defaultData = {
        username: "",
        sessionKey: "",
        wasSessionValid: false,
        accountID: 0,
        loginSuccesful: false,
        idTipo: 0,
        apiError: false,
    }

    const returningData = JSON.parse(JSON.stringify(defaultData)) 

    try{
        const { username, password, keySession, expectedUserTypes } = req.body
        const userData = await BdManager.getUserDataByUsername(username)
        if(!userData) return res.send(defaultData)
        if(!expectedUserTypes.includes(userData["ID_TIPO"])) return res.send(defaultData);// No posee el tipo esperado
        


        
        let accountID;
        if (keySession){
            accountID = await BdManager.get_accountID_by_sessionKey(keySession)
            if (accountID != 0){
                // Llave correcta
                
                if (!!(userData)){
                    if(accountID == userData["ID_CUENTA"]){
                        returningData.username = userData["USERNAME"]
                        returningData.wasSessionValid = true
                        returningData.sessionKey = keySession
                        returningData.accountID = accountID
                        returningData.idTipo = userData["ID_TIPO"]
                        returningData.loginSuccesful = true

                        return res.send(returningData)
                    }   
                }                 
            }
            else{
                returningData.wasSessionValid = false
            }

        } 

        const result = await BdManager.login(username, password);
        if (!result["isUsernameCorrect"] || !result["isPasswordCorrect"]){             
            return res.send(defaultData)
        }

        const sessionKey = await BdManager.createSession(userData["ID_CUENTA"])

        returningData.sessionKey = sessionKey["sessionKey"]
        returningData.accountID = userData["ID_CUENTA"]
        returningData.loginSuccesful = true
        returningData.username = userData["USERNAME"]
        returningData.idTipo = userData["ID_TIPO"]
        
        return res.send(returningData)
    }
    catch (error) {
        console.log(error)
        defaultData.apiError = true
        return res.send(defaultData)
    }
    });

    // Si llega hasta ac?? es por que la llave no fue v??lida
    
//     const result = await BdManager.login(username, password);

//     if (!result["isUsernameCorrect"] || !result["isPasswordCorrect"]){             
//         return res.send({ error: 'Credenciales incorrectas' })
//     }
//     else{
//         const userData = await BdManager.getUserDataByUsername(username);
//         //console.log(userData)
//         if (!expectedUserTypes.includes(userData["ID_TIPO"])){
//             console.log(expectedUserTypes, " | " , userData["ID_TIPO"] )
//             return res.send({ error: 'Credenciales incorrectas' })
//         }
        
//         const sessionKey = await BdManager.createSession(userData["ID_CUENTA"])
//         console.log(sessionKey)

//         res.send({
//             accountID: userData["ID_CUENTA"],
//             sessionKey: sessionKey["sessionKey"]
//         });
//     }   
// })

app.post('/isSessionValid', async(req, res) =>{
    try {
        const { sessionKey, expectedUserTypes } = req.body

        const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
        if(accountID == 0) return res.send({valid: false}) 
        const userData = await BdManager.getUserDataById(accountID);
        if(!expectedUserTypes.includes(userData["ID_TIPO"])) return res.send({valid: false})

        return res.send({
            //valid: false
            valid: (accountID != 0) ? true : false
        })
        
    } catch (error) {
        return res.send({
            valid: false
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

app.post('/getselfuserdata', async (req, res) =>{
    const { sessionKey } = req.body
    
    const signedUserAccountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    if (signedUserAccountID == 0) return res.send({ error: "Ha ocurrido un error" })

    const signedUserData = await BdManager.getUserDataById(signedUserAccountID);

    return res.send(signedUserData)
})



app.post('/listUsersByUserType', async (req, res) =>{
    const { usertype, sessionKey } = req.body
    
    const signedUserAccountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    if (signedUserAccountID == 0) return { error: "Ha ocurrido un error" }

    const signedUserData = await BdManager.getUserDataById(signedUserAccountID);
    const targetUsersData = await BdManager.get_users_by_usertype(usertype);
    //console.log(targetUsersData.length)

    switch (signedUserData["ID_TIPO"]){
        // Admin
        case 1:
            return res.send(targetUsersData)
            break;

        // Profesional
        case 2:
            // No puede obtener informaci??n de otros usuarios 
            return res.send(targetUsersData)
            break;

        // Cliente
        case 3:
            // No puede obtener informaci??n de otros usuarios
            return { error: "Ha ocurrido un error" }
            break;
        } 
})


app.post('/listActivities', async (req, res) =>{
    const { sessionKey } = req.body
    //console.log("gotten")
    const signedUserAccountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
    if (signedUserAccountID == 0) return { error: "Ha ocurrido un error" }

    const signedUserData = await BdManager.getUserDataById(signedUserAccountID);
    const activities = await BdManager.get_activities();

    switch (signedUserData["ID_TIPO"]){
        // Admin
        case 1:
            return res.send(activities)
            break;

        // Profesional
        case 2:
            // No puede obtener informaci??n de otros usuarios 
            return res.send(activities)
            break;

        // Cliente
        case 3:
            // No puede obtener informaci??n de otros usuarios
            return { error: "Ha ocurrido un error" }
            break;
        } 
})


app.listen(
    PORT,
    () => console.log(`Api corriendo en http://localhost:${PORT}`)
);