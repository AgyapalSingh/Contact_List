const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "Agya",
        phone: "1111111111"
    },
    {
        name: "Raja",
        phone: "234567863"
    }
]

// GET

app.get('/', function (req, res) {
    Contact.find({})
        .then(contacts => {
            return res.render('home', {
                title: "Contact List",
                contact_list: contacts
            });
        })
        .catch(err => {
            console.log('Error in fetching contacts from db', err);
            return res.status(500).send('Internal Server Error');
        });
});



// POST

app.post('/create-contact', function (req, res) {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
        .then(newContact => {
            console.log('****************', newContact);
            return res.redirect('back');
        })
        .catch(err => {
            console.log('Error in creating contact:', err);
            return res.status(500).send('Internal Server Error');
        });
});



// GET

app.get('/delete-contact', function (req, res) {
    let id = req.query.id;

    Contact.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('back');
        })
        .catch(err => {
            console.log('Error in deleting an object from the database', err);
            return res.status(500).send('Internal Server Error');
        });

});



//  LISTEN

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
    }
    console.log('Yup ! My Express Server is running on port:', port);
});