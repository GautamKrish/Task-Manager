const express = require('express')
require('./db/mongoose')
const jwt = require('jsonwebtoken')


const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
    if(req.method === 'GET') return res.status(500).send('GET requests are disabled')
    next()
})

app.use((req, res, next) => res.status(503).send('Server is currently under maintenance'))
app.use(express.json())


const usersRouter = require('./routes/users')
const tasksRouter = require('./routes/tasks')
app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
