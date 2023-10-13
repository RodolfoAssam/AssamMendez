const express = require('express');
const carro = require('./carro.js');
const app = express();

app.use('/carro',carro.router);
app.listen(8080,function(err){
    if(err) console.log(err);
    console.log("Servidor escuchando en puerto 8080")
})