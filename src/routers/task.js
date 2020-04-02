const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


//Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const allTasks = await Task.find({})
        res.send(allTasks)
    }catch (e){
        res.status(500).send(e)
    }
})

//Get task by id
router.get('/tasks/:id',async (req, res) => {
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


//Create new task
router.post('/tasks', async (req, res) => {
    const task = new Task (req.body)
    try{
        //TODO: check if task already exists.(Avoid duplicates()
        await task.save()
        res.status(201).send(task)
    }catch (e){
        res.status(400).send(e)
    }
})



//Update task
router.patch('/tasks/:id', async (req, res) => {
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


//Delete task
router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(400).send()
        }
        res.send(task)
    } catch (e){
        res.status(500).send()
    }
    
})


module.exports = router