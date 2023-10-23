const yaml = require('yaml')
const fs = require('fs')
const path = require('path')
const archivoObAr = fs.readFileSync(path.join(__dirname,'./archivosyaml/obar.yml'),'utf8')
const valorObAr = yaml.parse(archivoObAr);
console.table(valorObAr)
const archivoArr = fs.readFileSync(path.join(__dirname,'./archivosyaml/arreglo.yml'),'utf8')
const valorArr = yaml.parse(archivoArr);
console.table(valorArr)
const archivoArOb = fs.readFileSync(path.join(__dirname,'./archivosyaml/arob.yml'),'utf8')
const valorArOb = yaml.parse(archivoArOb);
console.table(valorArOb)
const archivoObj = fs.readFileSync(path.join(__dirname, './archivosyaml/persona.yml'), 'utf8');
const valorObj = yaml.parse(archivoObj);
console.table(valorObj)