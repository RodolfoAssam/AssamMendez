//Generacion de Archivos Txt/Pdf/Xlsx

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
doc.text("¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",10,10);
doc.save(path.join(__dirname,"Documento.pdf")); // will save the file in the current working directory


// Require library
var xl = require('excel4node');

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');

// Create a reusable style
var style = wb.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

// Set value of cell A1 to 100 as a number type styled with paramaters of style
ws.cell(1, 1)
  .string("La abeja hace Buzzzzz")
  .style(style);

// Set value of cell B1 to 200 as a number type styled with paramaters of style
ws.cell(1, 2)
  .string("Es de color amarillo")
  .style(style);

wb.write(path.join(__dirname,'Excel.xlsx'));