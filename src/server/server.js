const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./router')
const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.SERVER
app.use(express.json());
app.use('/', router)
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
},
() => console.log('Database connected'))
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});