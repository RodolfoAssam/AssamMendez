const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const { SwaggerTheme } = require('swagger-themes');
const redoc = require('redoc-express');
const app = express();

const theme = new SwaggerTheme('v3');

const options = {
  explorer: true,
  customCss: theme.getBuffer('outline')
};

const def = fs.readFileSync(path.join(__dirname,'./swagger.json'),
    {encoding:'utf8',flags:'r'});

const read = fs.readFileSync(path.join(__dirname,'./README.md'),
    {encoding:'utf8',flags:'r'});

const defObj = JSON.parse(def);
defObj.info.description = read;

const swaggerOptions = {
    definition:defObj,
    apis: [`${path.join(__dirname, "./index.js")}`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.use("/api-docs-json",(req,res)=>{
    res.json(swaggerDocs);
});



app.get(
    '/api-docs-redoc',
    redoc({
      title: 'API Docs',
      specUrl: '/api-docs-json',
      nonce: '', // <= it is optional,we can omit this key and value
      // we are now start supporting the redocOptions object
      // you can omit the options object if you don't need it
      // https://redocly.com/docs/api-reference-docs/configuration/functionality/
      redocOptions: {
        theme: {
          colors: {
            primary: {
              main: '#6EC5AB'
            }
          },
          typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: '15px',
            lineHeight: '1.5',
            code: {
              code: '#87E8C7',
              backgroundColor: '#4D4D4E'
            }
          },
          menu: {
            backgroundColor: '#ffffff'
          }
        }
      }
    })
  );

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.json());

/**
 * @swagger
 * /carro/:
 *   get:
 *     tags:
 *       - Carros
 *     summary: Consultar todos los carros
 *     description: Obtiene Json que con todos los carros de la Base de Datos
 *     responses:
 *       200:
 *         description: Regresa un Json con todos los carros
 *
 * /carro/{modelo}:
 *   get:
 *     tags:
 *       - Carros
 *     summary: Consultar un carro en específico en base a su modelo
 *     description: Obtiene Json con el modelo de carro específico de la Base de Datos
 *     parameters:
 *         - name: modelo
 *           in: path
 *           description: Modelo del carro
 *           required: true
 *           schema:
 *             type: string
 *             format: string
 *     responses:
 *       200:
 *         description: Regresa un Json con todos los carros
 *
 * /carros{id}:
 *   delete:
 *     tags:
 *       - Carros
 *     summary: Eliminar un carro
 *     description: Elimina un carro de la Base de Datos
 *     parameters:
 *         - name: modelo
 *           in: path
 *           description: Modelo del carro
 *           required: true
 *           schema:
 *             type: integer
 *             format: int64
 *     responses:
 *       200:
 *         description: Realizado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 * /carroso/:
 *   post:
 *     tags:
 *       - Carros
 *     summary: Insertar un nuevo carro
 *     description: Obtiene Json que con todos los carros de la Base de Datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: id del carro
 *               modelo:
 *                 type: string
 *                 description: modelo del carro
 *               año:
 *                 type: integer
 *                 description: año del carro
 *               marca:
 *                 type: string
 *                 description: marca del carro
 *     responses:
 *       200:
 *         description: Añade un registro
 *
 * /carro{modelo}:
 *   patch:
 *     tags:
 *       - Carros
 *     summary: Consultar todos los carros
 *     description: Obtiene Json que con todos los carros de la Base de Datos
 *     parameters:
 *         - name: modelo
 *           in: path
 *           description: Modelo del carro
 *           required: true
 *           schema:
 *             type: integer
 *             format: int64
 *     responses:
 *       200:
 *         description: Actualiza un registro
 */

//Async Await
app.get("/carro", (req, res) => {
    mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' })
        .then(conn => conn.query('SELECT * from carro'))
        .then(([rows, fields]) => res.json(rows));
});

app.get("/carro/:modelo", async (req, res) => {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' })
        const [rows, fields] = await conn.query("SELECT * from carro where modelo = '" + req.params.modelo+"'");
        if (rows.lenght == 0) {
            res.json({ mensaje: "Modelo No Existe" });
        } else {
            res.json(rows);
        }
});

//Eliminar
app.delete("/carro/:id", async (req, res) => {
    const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' })
    const [rows, fields] = await conn.query(`delete from carro where id = ${req.params.id}`);
    if (rows.affectedRows) {
        res.json({ mensaje: "Registro Eliminado" });
    } else {
        res.json({ mensaje: "Registro No Encontrado" });
    }
})

app.listen(8084, (req, res) => {
    console.log("Servidor express escuchando")
});

//Insertar
app.post("/carroso", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' });
        const id = req.body['id'];
        const modelo = req.body['modelo'];
        const año = req.body['año'];
        const marca = req.body['marca'];

        const [result] = await conn.query("INSERT INTO carro (id, modelo, año, marca) VALUES (?, ?, ?, ?)", [id, modelo, año, marca]);
        if (result.affectedRows === 1) {
            res.json({ mensaje: "Registro Insertado" });
        } else {
            res.json({ mensaje: "Error al insertar el registro" });
        }
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

//Actualizar
app.patch("/carro", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: '19100794' });
        const carroId = req.query.id;
        const { modelo, año, marca } = req.body;
        const updateData = {};
        if (modelo) updateData.modelo = modelo;
        if (año) updateData.año = año;
        if (marca) updateData.marca = marca;

        const query = "UPDATE carro SET ? WHERE id = ?";
        const [result] = await conn.query(query, [updateData, carroId]);

        if (result.affectedRows === 1) {
            res.json({ mensaje: "Registro Actualizado" });
        } else {
            res.json({ mensaje: "Error al actualizar el registro" });
        }

        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});