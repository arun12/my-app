const express = require('express');
const mongoose = require("mongoose");
const User = require('./models/user');

mongoose.connect('mongodb://localhost/practice_myapp',{ useNewUrlParser: true })
    .then(()=>console.log('Connected to mongodb'))
    .catch(err => console.log('could not connect to mongodb',err));

const app = express();

app.use(express.json()); //body parser

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.get('/', (req, res) => res.send('Hello World!'));

/*app.get('/api/users', (req, res) => {
    res.send('Api call');
    console.log(req);

});*/

app.post('/api/users', (req, res, next) => {
    const userdata = req.body;  //using body parser
    console.log('post data',userdata);
  
    const user = new User({
        fullname:userdata.fullname,
        email:userdata.email,
        username:userdata.username,
        password:userdata.password,
        date:{type:Date,default:Date.now},
        status:true
    });

     /*user.save();
    res.status(200).json({
        message:"User added successfully!"
    });*/

    user.save().then(createdUser => {
        res.status(201).json({
          message: "User added successfully",
          userId: createdUser._id
        });
    });
});

module.exports = app;