
const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes')

const PORT = 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(routes)
app.use(express.urlencoded({extended: false}))
app.use(express.json({
    type: "*/*"
  }))
app.use(express.static('public'));

app.listen(PORT, () =>{
    console.log("Server running in", PORT)
})


const UserManager = require('./public/managers/userManager')

//UserManager.get_profesionals();