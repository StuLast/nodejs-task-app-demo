const express = require('express');
const { ObjectID } = require('mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

require('./db/mongoose');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

// const jwt = require ("jsonwebtoken");

// const myFunction = async () => {
//     const token = await jwt.sign({_id: "abc123"}, 'thisismynewcourse', {expiresIn: "7 days"});
//     console.log(token);

//     try {
//     const payload  = await jwt.verify(token, 'thisismynewcourse');
//     console.log(payload);
//     } catch (e) {
//         console.log ("Error", e);
//     }
// }

// myFunction();