const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (!err) {
            console.log('Successfully Established Connection with MongoDB')
        } else {
            console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
        }
    });
module.exports = mongoose;