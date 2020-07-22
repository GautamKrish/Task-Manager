require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5f15a45e35205a4ad42fbe77')
.then((task) => {
    console.log(task)
    return Task.countDocuments({completed : false})
})
.then((count) => {
    console.log(count)
})
.catch((error) => {
    console.log(error)
})