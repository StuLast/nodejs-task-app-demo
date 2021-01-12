require("../src/db/mongoose");
const User = require('../src/models/user');

const id = '5fd701bfe62e562e689ff260';

// User.findByIdAndUpdate(id, {age: 52}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 52})
// }).then ((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// });

const myAsyncFunction = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const countUsers = await User.countDocuments({ age });
    return countUsers;
}

myAsyncFunction(id, 54).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});