const express = require('express')
require('./db/mongoose')



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

// const hashPassword = async(text) =>{
//     const hashedPassword = await bcrypt.hash(text, 8)
//     console.log(`Plain password :- ${text}`)
//     console.log(`Hashed Password :- ${hashedPassword}`)
//     console.log(await bcrypt.compare(text, hashedPassword))
// }

// hashPassword('KvVg*&9987')