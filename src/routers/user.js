const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router =  new express.Router();


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send;
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/users/me', auth,  async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', auth,  async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send();
    }
});

router.patch('/users/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid update fields"});
    }
    
    try {
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        const newUser = await user.save();
       
        if(!user) {
            return res.status(404).send('Unable to locate user');
        }

        res.status(200).send(newUser);
    } catch (e) {
            return res.status(400).send(`Unable to connect to database \n ${e}`);
    }
});

router.delete('/users/:id', auth, async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) {
            return res.status(403).send("Could not delete user")
        }
        res.status(200).send(deletedUser);
    } catch (e) {
        res.status(500).send(`Unable to delete user \n ${e}`);
    }
});



module.exports = router;