const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser : true, useUnifiedTopology : true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to mongo db')
    }

    console.log('Successfully connected to mongodb')
})