const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    description :  {
        type : String,
        trim  :true,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
}, {
    timestamps : true
})

taskSchema.pre('save', async function(next){
    console.log('Just before saving')
    next()
})
const Tasks = mongoose.model('Tasks', taskSchema)

module.exports = Tasks