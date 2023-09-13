const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.json());

/*app.get("/ServidorExpress",(req,res)=>{
    res.json({respuesta:"Contestando"})
});

app.post("/ServidorExpress",(req,res)=>{res.send("Servidor express contestando a peticion GET")
});

*/

//MySQL2 Usando promesas
app.get("/carro", (req, res) => {
    mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' })
        .then(conn => conn.query('SELECT * from carro'))
        .then(([rows, fields]) => res.json(rows));
});
//Async Await
app.get("/carro/:modelo", async (req, res) => {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' })
        const [rows, fields] = await conn.query("SELECT * from carro where modelo = '" + req.params.modelo+"'");
        if (rows.lenght == 0) {
            res.json({ mensaje: "Modelo No Existe" });
        } else {
            res.json(rows);
        }
});

app.delete("/carro",async (req,res)=>{
    const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' })
    cost [rows,fields] = await conn.query('delete from carro where id=$(req,query.id)');
    console.log(rows);
})

app.listen(8080, (req, res) => {
    console.log("Servidor express escuchando")
})