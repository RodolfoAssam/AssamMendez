const events = require('events');

function saludar(){
    const emisor = new events.EventEmitter();
    setTimeout(()=>emisor.emit('Orden De Tacos Lista: ','Asada'),5000);
    setTimeout(()=>emisor.emit('Orden De Tacos Lista: ','Pastor'),8000);
    setTimeout(()=>emisor.emit('Orden De Tacos Lista: ','Alambrillo'),4000);
    setTimeout(()=>emisor.emit('Orden De Tacos Lista: ','Picadillo'),2000);

    return emisor;
}

let sal = saludar();

sal.on('Orden De Tacos Lista: ',(nombre)=>{
    console.log('Orden De Tacos Lista: '+nombre)
});

/* emisor.addListener('saluda',(nombre)={
    console.log('Hola'+nombre)
});
*/
