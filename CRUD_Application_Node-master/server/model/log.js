const mongoose = require('mongoose');

var schema = new mongoose.Schema({
 email : String, 
 password : String
})

const User = mongoose.model('user', schema);

module.exports = User;