const express = require('express')
const router = express.Router()
const UserManager = require('./public/managers/userManager');

router.get("/", (req, res) =>{
    res.render("home")
})

router.get("/cliente/dashboard", async (req, res) =>{
    const username = req.query.username;
    const userData = await UserManager.getUserData(username);
    delete userData[0]["PASSWORD"];
    console.log(userData)
    res.render("dashboardCliente", {usuario: userData})
})


router.get("/login", (req, res) =>{
    res.render("login")
})

router.post("/login", async (req, res) =>{
    const username = req.body["guro_username"]
    const password = req.body["password"]
    const login_result = await UserManager.login(username, password);
    
    if (!login_result["isUsernameCorrect"] || !login_result["isPasswordCorrect"]){
        res.render("login")
    }
    else{
        res.redirect("http://localhost:3000/cliente/dashboard/?username=" + username);
    }
})

module.exports = router;