const express = require('express');
const Task = require('../models/task');
const router =  new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(`Error creating new task:\n ${e}`);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks)
    } catch (e){
        res.status(404).send("Unable to find tasks");
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        res.status(200).send(task);
    } catch (e) {
        res.status(404).send("Unable to find task");
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask) {
            res.status(404).send("Unable to delete task");
        }
        res.status(200).send(deletedTask);
    } catch (e) {
        res.status(500).send(`Unable to contact database \n ${e}`);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid update fields"});
    }

    try {
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        const updatedTask = await task.save();

        if(!task) {
            return res.status(404).send(updatedTask);
        }

        res.status(200).send(updatedTask);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;