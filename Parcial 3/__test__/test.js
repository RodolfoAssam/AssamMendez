const request = require('supertest');
let app='http://localhost:8080'
request(app)
    .get('/carro')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
        console.log('GET / debería devolver el mensaje "hello, world!"');
    });

// Test para obtener todos los carros
request(app)
    .get('/carro')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
        console.log('GET /carro debería devolver un array de carro');
    });

// Test para agregar un nuevo carro
const nuevoCarro = {
    id: 100,
    Modelo: 'GT',
    Año: '2001',
    Marca: 'Mercedes',
};

request(app)
    .post('/carro')
    .send(nuevoCarro)
    .expect(201)
    .end((err, res) => {
        if (err) throw err;
        console.log('POST /carro debería agregar un nuevo carro');
    });