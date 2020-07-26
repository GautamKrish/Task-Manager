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

const authentication = async() => {
    const token = await jwt.sign({_id : 'ROKTKG1KOR'}, 'thisismyboschntid', {expiresIn : "1 day"})
    console.log(`token is ${token}`)
    const verification = await jwt.verify(token, 'thisismyboschntid')
    return verification
}

authentication()
.then(verification => console.log(verification))
.catch(error => console.log(error))