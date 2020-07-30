const express = require('express')
require('./db/mongoose')
const jwt = require('jsonwebtoken')


const app = express()
const port = process.env.PORT || 3000
app.use(express.json())


const usersRouter = require('./routes/users')
const tasksRouter = require('./routes/tasks')
app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
