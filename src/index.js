const express = require('express');
const { ObjectID } = require('mongoose');

require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save()
    .then((result) => {
        res
            .status(201)
            .send(result);
    }).catch((error) => {
        res
            .status(400)
            .send(`Error creating new user: \n ${error}`);
    })
});

app.get('/users', (req, res) => {
    User.find({})
    .then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(500).send();
    })
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id)
    .then((user) => {

        if(!user) {
            return res.status(404).send();
        }

        res.status(200).send(user);

    }).catch((error) => {
        res.status(500).send();
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save()
    .then((result) => {
        res
        .status(201)
        .send(result);
    }).catch((error) => {
        res
        .status(400)
        .send(`Error creating new task: \n ${error}`);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({})
    .then((tasks) => {
        if(!tasks) {
            return res.status(404).send("Unable to find tasks");
        }

        res.status(200).send(tasks);

    }).catch((error) => {
        res.status(500).send("Unable to find tasks");
    })
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id)
    .then((task) => {
        if(!task) {
           return res.status(404).send("Unable to find task");
        }

        res.status(200).send(task);
    }).catch((error) => {
        res.status(500).send("Can't access taks data");
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

