// server creation

//jwtimport
const jwt = require('jsonwebtoken')


//1. import express

const express = require('express')

const dataService = require('./services/data.services')

//server app creation using express
const app = express()

//parse json data
app.use(express.json())

//application specific middleware
const middleWare = (req,res,next) => {
    console.log("application specific middleware");
    next()
}

//use middleware in app 
app.use(middleWare)

const jwtMiddleware = (req,res,next) => {
    try{
        token = req.headers['x-access-token']
        const data = jwt.verify(token,'supersecretkey12345')
        console.log(data);
        next()
    }

    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:"please Login"
        })
    }
}





//Bank server
//register API
app.post('/register',(req,res)=>{
    const result = dataService.register(req.body.username ,req.body.acno ,req.body.password)

   res.status(result.statusCode).json(result)
})


//login API
app.post('/login',(req,res)=>{
    const result = dataService.Login(req.body.acno, req.body.pswd)

   res.status(result.statusCode).json(result)
})
 

//deposit api
app.post('/deposit',jwtMiddleware,(req,res)=>{
    const result = dataService.deposit(req.body.acno, req.body.password, req.body.amt)

   res.status(result.statusCode).json(result)
})

//Withdraw api
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    const result = dataService.withdraw(req.body.acno, req.body.password, req.body.amt)

   res.status(result.statusCode).json(result)
})

//Transaction Api
app.post('/transaction',jwtMiddleware,(req,res)=>{
    const result = dataService.getTransaction(req.body.acno)

   res.status(result.statusCode).json(result)
})







//user request resolving


//GET request
app.get('/',(req,res)=>{
    res.send("get request")
})

//POST requestm- to create data
app.post('/',(req,res)=>{
    res.send("post request")
})

//PUT request - to modify entire data
app.put('/',(req,res)=>{
    res.send("put request")
})

//PATCH request - to modify partially
app.patch('/',(req,res)=>{
    res.send("patch request")
})

//DELETE request - to  remove or delete data
app.delete('/',(req,res)=>{
    res.send("delete request")
})



//setup the port number
app.listen(3000,()=>{
    console.log("server started at 3000");
})