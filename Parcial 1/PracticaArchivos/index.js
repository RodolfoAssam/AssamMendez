const fsc = require('fs');
const path  = require('path');
const { jsPDF } = require("jspdf"); // will automatically load the node version

//console.log(_dirname);
//console.log(_filename);

//Generacion de un archivo de texto con el modulo FS usando callbacks
fsc.writeFile(path.join(__dirname,'DocumentoChiste.txt'),"¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",(err)=>{
    if (err){
        console.log(err)
    } else {
        console.log("¿qué hace una abeja en el gimnasio? ¡Zum-ba!")
    }
});

//Instalacion del paquete jsPDF para agregarle a la aplicacion la habilidad de generar PDF

const doc = new jsPDF();
doc.text("");
doc.save(path.join(__dirname,"a4.pdf")); // will save the file in the current working directory