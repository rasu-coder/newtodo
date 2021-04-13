const mongoose = require('mongoose');
require('dotenv').config();
// const url = "ENTER YOUR OWN DATABASE URL" 
const url = process.env.MONGO_URL;
//console.log(process);
const connectDB = async () => {
    try {

        //console.log("\n\n\n\n\n\n\n\n");
        //console.log(url);
        const con = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB

//1Pep4z0KcFzY27UV