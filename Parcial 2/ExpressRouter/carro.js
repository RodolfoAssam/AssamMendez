const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.status(200).json({respuesta:"Peticion get a ruta: carro"});
})
.post('/',function(req,res){
    res.status(200).json({respuesta:"Peticion post a ruta: carro"});
})
.put('/',function(req,res){
    res.status(200).json({respuesta:"Peticion put a ruta: carro"});
})
.delete('/',function(req,res){
    res.status(200).json({respuesta:"Peticion delete a ruta: carro"});
})
module.exports.router=router;