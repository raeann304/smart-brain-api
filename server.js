const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //localhost
      user : 'postgres',
      password : 'rayray2021',
      database : 'smartbrain'
    }
  });


const app= express();

app.use(express.urlencoded({extended:false}));   //VERY IMPORTANT. parse the json data
app.use(express.json());

app.use(cors());



app.get('/', (req, res) =>{res.send(database.users) }); //basic route
app.post('/signin', signin.handleSignin(db, bcrypt)) //signin
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)  })//dependency injection,register
app.get('/profile/:id', (req,res) =>{profile.handleProfileGet(req, res, db)}) //we want to get the user for their home page, profile page for each user
app.put('/image', (req, res) => {image.handleImage(req, res, db)}) //image -updates entries and increases the count
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})   

app.listen(3001, ()=>{
    console.log('app is running on port 3001');
})












/*
API plan:
 
Endpoints:                             RESPONCE
root route     /                 ---> res=this is working
signin route   /signin           ---> POST = it will respond with either success/fail (we are posting new info, json)
register route /register         ---> POST = respond with the user (we want to add the data to a database/ or variable in the server)
home screen    /profile/:userId  ---> GET = it will return the user
image endpoint /image            ---> PUT = it will return the updated user object (we are updating the user score)


*/


/*// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
}); */