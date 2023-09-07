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
app.get("/usuarios", (req, res) => {
    mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'crud' })
        .then(conn => conn.query('SELECT * from cusuario'))
        .then(([rows, fields]) => res.json(rows));
});
//Async Await
app.get("/usuarios:id", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'crud' })
        const [rows, fields] = await conn.query('SELECT * from cusuario from cusuario where idusuario=' + req.params.id);
        if (rows.lenght == 0) {
            res.json({ mensaje: "Usuario No Existe" });
        } else {
            res.json(rows);
        }
        res.json(rows);
    } catch {
        res.json({ mensaje: "Error de conexion" });
    }
});

app.listen(8080, (req, res) => {
    console.log("Servidor express escuchando")
})