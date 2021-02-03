require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const db = require('./config/mongodb').mongoURI;
const fecth = require('node-fetch');


// IS: Auth mongoURI to mongoDB server
// FS: Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.error(err))
//

const app = express();

// Using controller from routes
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', require('./routes/sign-in.js'))
app.use('/', require('./routes/sign-up.js'))

// const {setResponse, cache, getRepos} = require('./config/redis.js')
// app.get('/repos/:username', cache, getRepos);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Apps listening on port ${PORT}`);
});