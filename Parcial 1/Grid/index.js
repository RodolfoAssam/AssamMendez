const express = require('express');
const cors = require('cors');

const {promisePool} = require('./connection.js');
const app = express();

app.use(express.json());
app.use(cors());
app.get("/ServidorExpress/carro",(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Servidor express contestando a peticion GET")
});

app.get("/carros",async(req,res)=>{
    const [query] = await promisePool.query('SELECT * from carro')

    console.log(query)
    res.json(query) 
})

app.post("/ServidorExpress",(req,res)=>{res.send("Servidor express contestando a peticion GET")
});

app.listen(8080,(req,res)=>{
    console.log("Servidor express escuchando")
})