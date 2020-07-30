const express = require('express')
const router = new express.Router()
const User = require('../models/user')



router.post('/users', async (req, res) => {
    try {
        const user = await new User(req.body).save()
        const token = await user.generateToken()
        res.send({ user, token })
    }
    catch (error) {
        res.status(500).send(error)
    }

})

router.post('/users/login', async (req, res) => {
    try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token  = await user.generateToken()
    res.send({ user, token})
    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send(`No user by ${_id} found`)
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const allowedToUpdate = ['name', 'age', 'email', 'password']
    const isUpdateAllowed = fieldsToUpdate.every(key => allowedToUpdate.includes(key))

    if (fieldsToUpdate.length == 0 || !isUpdateAllowed) {
        return res.status(400).send({
            error: 'Please check the fields to update'
        })
    }
    try {
        let user = await User.findById(req.params.id)
        fieldsToUpdate.forEach(update => user[update] = req.body[update])
        user = await user.save()    
        if (!user) {
            return res.status(404).send({
                error: `No user by the id ${req.params.id} found.`
            })
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send({
                error  : `No user by the id ${req.params.id} found`
            })
        }
        res.send(user)
    }catch(error){
        res.status(500).send()
    }
})

module.exports = router
