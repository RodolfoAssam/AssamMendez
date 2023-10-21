import express from 'express'
import authRouter from './auth.js'
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8080; // Define un valor predeterminado si PORT no está definido

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json())
    .use('/',authRouter)
    .get('/notlogin',(req,res)=>{
        res.status(200).json({message:"Loggeate primero"})
    })
    .listen(PORT,()=>{
        console.log('Servidor ejecutandose en 8080');
    }
)