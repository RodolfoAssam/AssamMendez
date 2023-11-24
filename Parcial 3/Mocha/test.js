const chai = require('chai');
const expect = chai.expect;
const suma = require('./modulo');

describe('My module',function(){
    it('se debe sumar dos numeros', function(){
        const resultado = suma(5,6);
        expect(resultado).to.equal(11);
    })
    it('se debe sumar dos numeros de diferentes signos', function(){
        const resultado = suma(-5,6);
        expect(resultado).to.equal(1);
    })
    it('deberia sumar cero', function(){
        const resultado = suma(0,6);
        expect(resultado).to.equal(6);
    });
    it('deberia sumar dos numeros negativos', function(){
        const resultado = suma(-5,-6);
        expect(resultado).to.equal(-11);
    })
});

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app='http://localhost:8080'

chai.use(chaiHttp);

describe("Pruebas al metodo get de la ruta de usuario", () => {
    it("Si hago un get a la ruta usuario me debe dar un status 200",()=>{
        chai.request(app)
            .get("/carro")
            .end((err,res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
          });
    });
});