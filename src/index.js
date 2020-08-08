const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const User = require('./models/user')
const multer = require('multer')

const upload = multer({
    dest : 'images',
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            cb(new Error('Please upload a word document'))
        }
        cb(undefined, true)
    }
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

const middlewareError = (req, res, next) => {
    throw new Error('Middleware Error')
}
app.post('/upload', middlewareError, (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(500).send(error.message)
})
