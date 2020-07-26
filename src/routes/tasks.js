const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    try {
        const task = await new Task(req.body).save()
        res.status(201).send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }

})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.send(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        console.log(_id)
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        console.log(task)
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const allowedToUpdate = ['completed', 'description']
    const isUpdateAllowed = fieldsToUpdate.every(key => allowedToUpdate.includes(key))

    if (fieldsToUpdate.length == 0 || !isUpdateAllowed) {
        return res.status(400).send({
            error: 'Please check the fields to update'
        })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(400).send({
                error: `No task by the id ${req.params.id} found`
            })
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send({
                error : `No task by the id ${req.params.id} found`
            })
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router