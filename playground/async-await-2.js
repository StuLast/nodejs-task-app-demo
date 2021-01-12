require("../src/db/mongoose");
const Task= require('../src/models/task');

let id = '5fd6d99f0d44b822a474307e';

// Task.findByIdAndUpdate(id, {completed: true}).then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: true})
// }).then ((result) => 
//     console.log("You have", result, "task(s) left");
// }).catch((e) => {
//     console.log(e)
// });

const updateAndcount = async(id) => {
    await Task.findByIdAndUpdate(id, {completed: true});
    const taskCount = Task.countDocuments({completed: true});
    return taskCount;
}



updateAndcount(id).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log("Unable to find id");
})


