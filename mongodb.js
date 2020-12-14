//CRUD Operations

const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
    if(err) {
      return console.log(err);
    }

    
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name:"Mandy",
    //     age: 45
    // });

    // db.collection('users').findOne({
    //     name: 'Brandy'
    // }, (err, user) => {
    //     if(err) {
    //         return console.log("Database error");
    //     }

    //     if(!user) {
    //         return console.log("Unable to find user")
    //     }

    //     console.log(user);
    // });


    db.collection('users').find({age: 45}).toArray((err, users) => {
        if(err) {
            return console.log(err);
        }
        console.log(users);
    });

    db.collection('users').find({age: 45}).count((err, count) => {
        if(err) {
            return console.log(err);
        }
        console.log(count);
    });

    db.collection('tasks').findOne({_id: new ObjectID("5fd406ba5c10483a387e0014")}, (err, task) => {
        if(err) {
            return console.log("Could not find task");
        }

        if(!task) {
            return console.log("Could not find task");
        }

        console.log(task);
    })

    db.collection('tasks').find({completed: false}).toArray((err, tasks) => {
        if(err) {
            return console.log("Could not find tasks");
        }

        if(!tasks) {
            return console.log("Could not find tasks");
        }

        console.log(tasks);
    })
});