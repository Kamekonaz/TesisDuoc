const express = require('express')
const router = express.Router()

router.get("/", (req, res) =>{
    res.render("register")
})

router.get("/login", (req, res) =>{
    res.render("login")
})

router.post("/login", (req, res) =>{
    console.log(req.body)
    // const { username, password } = req.body;
    // if(!username || !password){
    //     return res.status(400).send({status: 'failed'})
    // }
    // res.status(200).send({status: 'recieved'})
})

module.exports = router;