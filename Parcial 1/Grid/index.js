const express = require('express');
const cors = require('cors');
const bearerToken = require('express-bearer-token');

const { promisePool } = require('./connection.js');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bearerToken());

app.get("/ServidorExpress/carro", (req, res) => {
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Servidor express contestando a peticion GET");
});

app.get("/carros", async (req, res) => {
    const [query] = await promisePool.query('SELECT * from carro');
    console.log(query);
    res.json(query);
});

//Bearer aqui verifico el token
//token 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
//http://localhost:8080/github.api
//https://api.github.com/users/RodolfoAssam/repos
app.get("/github.api", (req, res) => {
    if (!req.token) {
        return res.status(401).json({ error: 'Token de autenticación requerido' });
    }
    res.send("Servidor express contestando a peticion GET");
});

app.listen(8080, (req, res) => {
    console.log("Servidor express escuchando");
});
