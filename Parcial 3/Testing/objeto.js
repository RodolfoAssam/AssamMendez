let objeto = {
    id:2,
    modelo:"Mustang",
    año:"2005",
    marca:"Ford"}

let campos=Object.keys(objeto);
let valores=Object.values(objeto);
let llaves=Object.entries(objeto);

let sentenciasql="";
let cadenaUpdate="update modelo";
let cadenaSet ="";
let cadenaWhere ="where";

campos.forEach(campo=>{
    console.log(campo+'=´'+objeto[campo]+'´,');
    cadenaSet=cadenaSet+campo+'='+objeto[campo]+
});