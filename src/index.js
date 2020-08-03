const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const User = require('./models/user')


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if(req.method === 'GET') return res.status(500).send('GET requests are disabled')
//     next()
// })

// app.use((req, res, next) => res.status(503).send('Server is currently under maintenance'))
app.use(express.json())
const usersRouter = require('./routes/users')
const tasksRouter = require('./routes/tasks')
app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

const findTask = async() => {
    // const task = await Task.findById('5f2793ec1bff8e3768b092c7')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5f2793c41bff8e3768b092c5')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

findTask()
