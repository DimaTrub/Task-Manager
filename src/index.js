const express = require('express')

//Mongoose Connection to dataBase
require('./db/mongoose')

//Models
const User = require('./models/user')
const Task = require('./models/task')


const port = process.env.port || 3000
const app = express()

//Automatically Parse incoming JSON to an object
app.use(express.json())


// //////////////////////////////////////////////////////
// //                  END-POINTS                     //
// ////////////////////////////////////////////////////

// //Get for fetch data
app.get('/users', async (req, res) => {
    try{
        const allUsers = await User.find({})
        res.send(allUsers)
    }catch(e) {
        res.status(500).send()
    }
})

// Route parameters --> parts of the URl are used to capture dynamic values (:id)
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    //Mongoose converts for us string _id to object id  by itself in "findById" function 
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(500).send(e)
    }
})


app.get('/tasks', async (req, res) => {
    try {
        const allTasks = await Task.find({})
        res.send(allTasks)
    }catch (e){
        res.status(500).send(e)
    }
})


app.get('/tasks/:id',async (req, res) => {
    const _id = req.params.id
    try{
        const task =  await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})




//POST for resource creation
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch (e) {
        res.status(400).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task (req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch (e){
        res.status(400).send(e)
    }
})


//Patch for update resource
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const validParameters = ['gender','name','age','email','password']
    const isValid = updates.every((parameter)=>{
        validParameters.includes(parameter)
    })
    if(!isValid){
        return res.status(400).send({error: 'Invalid parameters'})
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch (e) {
        res.status(400).send(e)
    }

})

app.patch('/tasks/:id', async (req, res) => {
    const validFields = ['completed','description']
    const userFields = Object.keys(req.body)
    const isValid = userFields.every((parameter) => validFields.includes(parameter))
    
    if(!isValid){
        return res.status(400).send({error: 'Invalid parameters'})
    }
    const _id = req.params.id
    try{
        const user = await Task.findByIdAndUpdate(_id, req.body,{new: true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e){
        res.status(400).send(e)
    }

})

































// const deleteTaskAndCount = async (id)=>{
//     const task = await Task.findByIdAndDelete(id)
//     const counter = await Task.countDocuments({ completed: false })

//     return counter
// }

// deleteTaskAndCount('5e819f1bf89b250c9ce8cc05').then((count)=>{
//     console.log(count);
    
// })






app.listen(port, ()=>{
    console.log("server is up on port:  " + port);
    
})

