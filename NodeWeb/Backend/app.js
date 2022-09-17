
const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const PORT = 3000

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")       
app.use(bodyParser.urlencoded({
  extended: true
}));       
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret"
}))


app.use(routes)  

app.listen(PORT, () =>{
    console.log("Server running in", PORT)
})
