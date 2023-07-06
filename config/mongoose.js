

// require the library
const mongoose = require('mongoose');

// connect to Database
// mongoose.connect('mongodb://0.0.0.0/contacts_list_db');
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');

// acquire the connection (to check if it is successful)
const db = mongoose.connection;


// error
db.on('error', console.error.bind(console, 'connection error'));

// Up and running then print the message
db.once('open', function () {
    console.log('Successfully connected o database')
});