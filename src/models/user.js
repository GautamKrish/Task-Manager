const mongoose = require('mongoose')
const validator = require('validator')

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
    },
    password : {
        type : String,
        required : true,
        trim  : true,
        validate(password) {
            if(password.length < 6){
                throw new Error('Password should have atleast 6 charcaters')
            }
            if(password.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password" ')
            }

        }
    }
})

module.exports = User