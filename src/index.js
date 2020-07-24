const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


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


app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})