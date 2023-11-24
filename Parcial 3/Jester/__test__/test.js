const request = require('supertest');
const suma = require('../modulo');


let app='http://localhost:8080'

describe("Pruebas al metodo get de la ruta de usuario", () => {
    it("Si hago un get a la ruta usuario me debe dar un status 200",()=>{
        request(app)
            .get("/carro")
            .end((err,res) => {
            if(err) throw err;
              expect(res.statusCode).toBe(200);
          });
    });
});