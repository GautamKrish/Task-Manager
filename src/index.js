const express = require('express')
require('./db/mongoose')
const usersRouter = require('./routes/users')
const tasksRouter = require('./routes/tasks')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})