const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


const port = process.env.port || 3000
const app = express()

//Automatically Parse incoming JSON to an object
app.use(express.json())

//We use POST for resource creation
app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch( (Error) => {
        res.status(400)
        res.send(Error)
    })
})

app.listen(port, ()=>{
    console.log('The server is up on port', port);
})