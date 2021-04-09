const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const csvToDatabase = require('./public/javascripts/csvparser');



const app = express();

mongoose.connect('mongodb://localhost:27017/datalogger', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch(err => {
        console.log("Error:")
        console.log(err)
    })

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('homedashboard');

})

app.post('/submit', async (req, res) => {
    const { file } = req.body;
    console.log(file);

    csvToDatabase.parseCsvToDatabase('./public/csvfiles/' + file);

    res.render('homedashboard');
})

app.get('/data', async (req, res) => {
    const Data = require('./models/datalogger')
    const xs = [];
    const ys = [];

    const response = await Data.find({});
    console.log(response);

    for (let log of response) {
        xs.push(log.Date);
        ys.push(log.Gas_Temp);
    }
    
    res.json({
        xs,
        ys
    });

})

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})