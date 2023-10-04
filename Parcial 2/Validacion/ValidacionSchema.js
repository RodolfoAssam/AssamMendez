const express = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const app = express();

app.use(express.json());

app.post("/usuario", checkSchema({
    'edad': { notEmpty:true },
    'email': { isEmail: true, errorMessage: 'Email debe ser un correo' }
}),
    (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return res.send({ mensaje: "Respuesta a peticion post" })
        }else{
            return res.send({ mensaje: result.array()})
        }
    })
app.listen(8080, () => {
    console.log("Servidor Express Escuchando 8080");
})