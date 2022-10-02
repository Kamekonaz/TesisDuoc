const express = require('express');
const app = express();
var https = require('https');
const PORT = 3001;

//app.use(express.json())
app.use(express.urlencoded());


// app.get('/holamundo', (req, res) =>{
//     res.status(200).send({
//         hola: 'mundo'
//     })
// });

app.post('/holamundo', (req, res) =>{
    const { id } = req.params
    const { hola } = req.body
    console.log(id, hola)

    if (!hola){             
        res.status(418).send({ message: 'ola no hay mundo' })
    }
    else{
        res.send({
            holamundo: `hola ${hola}`
        })
    }   
})

app.listen(
    PORT,
    () => console.log(`Api corriendo en http://localhost:${PORT}`)
);