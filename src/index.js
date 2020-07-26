const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { findByIdAndDelete } = require('./models/user')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    try {
        const user = await new User(req.body).save()
        res.status(201).send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }

})

app.post('/tasks', async (req, res) => {
    try {
        const task = await new Task(req.body).save()
        res.status(201).send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }

})

app.get('/users/:id', async (req, res) => {
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

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.send(500).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
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


app.patch('/users/:id', async (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const allowedToUpdate = ['name', 'age', 'email', 'password']
    const isUpdateAllowed = fieldsToUpdate.every(key => allowedToUpdate.includes(key))

    if (fieldsToUpdate.length == 0 || !isUpdateAllowed) {
        return res.status(400).send({
            error: 'Please check the fields to update'
        })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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


app.patch('/tasks/:id', async (req, res) => {
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


app.delete('/users/:id', async (req, res) => {
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


app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})