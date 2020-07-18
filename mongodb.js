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
    db.collection('tasks').deleteOne({
        description : 'Mongodb course'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})

