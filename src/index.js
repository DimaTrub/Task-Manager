const express = require('express')

//Mongoose Connection to dataBase
require('./db/mongoose')



//Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const port = process.env.port || 3000
const app = express()

//Automatically Parse incoming JSON to an object
app.use(express.json())

//Use router files
app.use(userRouter)
app.use(taskRouter)



app.listen(port, ()=>{
    console.log("server is up on port:  " + port);
    
})

