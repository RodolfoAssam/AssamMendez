const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const app = express();
app.use(express.json());
app.use(express.urlencoded())

const opciones = {
    key : fs.readFileSync(path.join(__dirname, 'Certificado/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'Certificado/cert.pem'))
}

app.get("/prueba",(req,res)=>{
    res.json({ Mensaje:'Funcionando'})
})

/* 
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
*/

https.Server(opciones,app).listen(8080, (req,res)=>{
    console.log('Funcionando en 8080');
})