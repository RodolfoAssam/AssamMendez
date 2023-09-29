const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();
const body = require('body-parser');

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.json());
app.use(body.urlencoded({extended:false}));

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
        if (rows.length == 0) {
            res.json({ mensaje: "Modelo No Existe" });
        } else {
            res.json(rows);
        }
});

//Eliminar
app.delete("/carro", async (req, res) => {
    const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' })
    const [rows, fields] = await conn.query(`delete from carro where id = ${req.query.id}`);
    if (rows.affectedRows) {
        res.json({ mensaje: "Registro Eliminado" });
    } else {
        res.json({ mensaje: "Registro No Encontrado" });
    }
    console.log(rows);
})

app.listen(8080, (req, res) => {
    console.log("Servidor express escuchando")
});

//Insertar
app.post("/carro", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' });
        console.log(req.body);
        const id = req.body['id'];
        const modelo = req.body['modelo'];
        const año = req.body['año'];
        const marca = req.body['marca'];

        const [result] = await conn.query("INSERT INTO carro (id, modelo, año, marca) VALUES (?, ?, ?, ?)", [id, modelo, año, marca]);
        res.sendFile(__dirname + "formulario.html");
        if (result.affectedRows === 1) {
            res.json({ mensaje: "Registro Insertado" });
        } else {
            res.json({ mensaje: "Error al insertar el registro" });
        }
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

//Actualizar
app.patch("/carro", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' });
        const carroId = req.query.id;
        const { modelo, año, marca } = req.body;
        const updateData = {};
        if (modelo) updateData.modelo = modelo;
        if (año) updateData.año = año;
        if (marca) updateData.marca = marca;

        const query = "UPDATE carro SET ? WHERE id = ?";
        const [result] = await conn.query(query, [updateData, carroId]);

        if (result.affectedRows === 1) {
            res.json({ mensaje: "Registro Actualizado" });
        } else {
            res.json({ mensaje: "Error al actualizar el registro" });
        }

        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
    
    const formData = new FormData(document.getElementById("idForm"));
    const urlSearch = new URLSearchParams(formData).toString();
    
    fetch('http://...',{method: 'POST', body: formData})
    .then(response=>response.json())
    .then(dato=>console.log(dato));
});