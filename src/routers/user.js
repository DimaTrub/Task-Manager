const express = require('express')
const router = new express.Router()
const User = require('../models/user')


//Get all users
router.get('/users', async (req, res) => {
    try{
        const allUsers = await User.find({})
        res.send(allUsers)
    }catch(e) {
        res.status(500).send()
    }
})

//Get user by id
router.get('/users/:id', async (req, res) => {  // Route parameters --> parts of the URl are used to capture dynamic values (:id)
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


//Create new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        //TODO: check if user already exists.(Avoid duplicates()
        await user.save()
        res.status(201).send(user)
    }catch (e) {
        res.status(400).send(e)
    }
})


//Update User
router.patch('/users/:id', async (req, res) => {
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

//Delete user
router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(400).send()
        }
        res.send(user)
    } catch (e){
        res.status(500).send()
    }
    
})

module.exports = router