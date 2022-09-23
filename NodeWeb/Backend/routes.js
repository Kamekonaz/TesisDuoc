const express = require('express')
const router = express.Router()
const UserManager = require('./public/managers/userManager');

router.get("/", (req, res) =>{
    res.render("home", { usuario: req.session.user })
})

router.get("/cliente/dashboard", async (req, res) =>{
    if(!req.session.user) return res.redirect("/login")

    res.render("dashboardCliente", { usuario: req.session.user })
})

router.get("/cliente/ReportarAccidente", async (req, res) =>{
    if(!req.session.user) return res.redirect("/login")

    res.render("reportarAccidente", { usuario: req.session.user })
})

router.get("/login", (req, res) =>{
    res.render("login", { usuario: req.session.user })
})

router.get("/logout", (req, res) =>{
    req.session.destroy()
    res.redirect("/")
})

router.post("/login", async (req, res) =>{
    const username = req.body["guro_username"]
    const password = req.body["password"]
    const login_result = await UserManager.login(username, password);
    
    if (!login_result["isUsernameCorrect"] || !login_result["isPasswordCorrect"]){
        res.render("login", { usuario: req.session.user })
    }
    else{
        const userData = await UserManager.getUserData(username);
        delete userData[0]["PASSWORD"];
        req.session.user = userData[0];
        req.session.save()
        res.redirect("/cliente/ReportarAccidente");
    }
})

module.exports = router;