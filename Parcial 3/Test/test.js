const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app='http://localhost:8080'

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