require("../src/db/mongoose");
const Task= require('../src/models/task');

const id = '5fd6d99f0d44b822a474307e';

Task.findByIdAndUpdate(id, {completed: true}).then((task) => {
    console.log(task);
    return Task.countDocuments({completed: true})
}).then ((result) => {
    console.log("You have", result, "task(s) left");
}).catch((e) => {
    console.log(e)
});