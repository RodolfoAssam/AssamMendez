

authRouter
    .get('/',(req,res)=>{
        res.json({message: 'Ruta Desprotegida'})
    })
    .post('/login',(req,res)=>{
        const {user,password}=req.body
        console.log('User $(user) is trying to login.')
        if(user == 'admin' && password == 'admin'){
            return res.status(201).json({
                token: jwt.sign({user: 'admin'}, SECRET_KEY)
            })
        }
    })

