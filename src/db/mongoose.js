const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
})

const User = mongoose.model('User',{
    name : {
        type : String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        default : 0,
        validate(age) {
            if(age < 0){
                throw new Error('Age cannot be negative.')
            }
        }
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        validate(email) {
            if(!validator.isEmail(email)) {
                throw new Error('Invalid email')
            }
        }
    }
})

const me = new User({
    name : 'Shreyasi',
    age : 23,
    email : 'shreyasi@gmail.com'
})

me.save()
.then(() =>{
    console.log( me )
})
.catch((error) => {
    console.log(`Error : - ${error}`)
})

// const Tasks = mongoose.model('Tasks', {
//     description :  {
//         type : String
//     },
//     completed : {
//         type : Boolean
//     }
// })

// const task = new Tasks({
//     description : 'node.js course',
//     completed : false
// })

// task.save()
// .then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })