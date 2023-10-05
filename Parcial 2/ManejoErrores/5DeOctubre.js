const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

app.post("/usuario",[
     check('edad').isNumeric(),
     check('correo').isEmail(),
],(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()){
        console.log(req.body);
        res.json({mensaje:"Respuesta a peticion post"});
    } else{
        res.json(result);
    }
})
app.listen(8080,()=>{
    console.log("Servidor Express Escuchando 8080");
})

app.get("/", (req, res, next) => {
    try {
      throw new Error('Se ha producido un error en esta ruta.');
    } catch (error) {
      next(error);
    }
  });  

  app.use((err, req, res, next) => {
    res.status(500).send({
      error: 'Se ha producido un error en la aplicación.',
      message: err.message
    });
  });
  