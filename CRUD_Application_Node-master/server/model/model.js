const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: String,
    gender: String,
    password: String

})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;