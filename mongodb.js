const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'
const id = new ObjectID()
console.log(`Object ID :- ${id}`)
console.log(`timestamp :- ${id.getTimestamp()}`)
console.log(`length :- ${id.id.length}`)
console.log(`In string :- ${id.toHexString().length}`)

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to mongo db')
    }

    console.log('Successfully connected to mongodb')
    const db = client.db(dbName)
    //     db.collection('users').insertMany([{
    //         name : 'Katta',
    //         age  :23
    //     },
    //     {
    //         name : 'Chandan',
    //         age  :23
    //     }], (error, result) => {
    //         if(error){
    //             return console.log(error)
    //         }
    //         console.log(result.ops)
    //     })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Mongodb course',
    //         completed: false
    //     },
    //     {
    //         description: 'Read for half an hour',
    //         completed: false
    //     },
    //     {
    //         description: 'Watch a podcast',
    //         completed: false
    //     }], (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert into the collection')
    //         }
    //         console.log('Successfully added tasks to the tasks collection \n', result.ops)
    //     })
})

