require("../src/db/mongoose");
const User = require('../src/models/user');

const id = '5fd701bfe62e562e689ff260';

User.findByIdAndUpdate(id, {age: 52}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 52})
}).then ((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
});