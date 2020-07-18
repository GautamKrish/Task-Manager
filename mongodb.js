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
    // db.collection('tasks').findOne({
    //     _id :  new ObjectID("5f12c72a9385b12b0cebbe44")
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to fetch the task')
    //     }
    //     console.log(result)
    // })

    // db.collection('tasks').find({
    //     completed : false
    // }).toArray((error, result) =>{
    //     if(error){
    //         return console.log('Error in fetching incompleted tasks')
    //     }
    //     console.log(result)
    // })

    // db.collection('users').updateOne({
    //     _id : new ObjectID("5f1136bcf6e6ad0628645410")
    // }, {
    //     $set:{
    //         age : 24
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    db.collection('tasks').updateMany({
        completed : false
    },{
        $set : {
            completed : true
        }
    }).then((result) =>{
        console.log(result)
    }).catch(() => {
        console.log(error)
    })
})

