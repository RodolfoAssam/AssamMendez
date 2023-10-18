const express=require('express');
const https = require("https");
const fs = require('fs');
const path=require('path');

const opciones = {
    key: fs.readFilesSync(path.join(__dirname,"ssl/key.pem")),
    cert: fs.readFilesSync(path.join(__dirname,"ssl/cert.pem"))
}

const app = express();

app.get("/",function(req,res){
    res.send("Respuesta segura");
})

/*
app.listen(8080,function(){
    console.log("Servidor Express Seguro Puerto 8080");
})
*/

https.createServer(opciones,app).listen(8080,function(){
    console.log("Servidor Express Seguro en puerto 8080")
})