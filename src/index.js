const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const User = require('./models/user')
const multer = require('multer')

const upload = multer({
    dest : 'images'
})


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


app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})
