//import some dependancies/Packages


//http framework for handling requests
const express = require('express');
const app = express();
//DBMS mysql
const mysql = require ('mysql2');
//cross origin resource sharing
const cors = require ('cors');
//Environment Variable doc
const dotenv = require('dotenv');
const { Console } = require('console');


//connecting the packages
app.use(express.json());
app.use(cors());
dotenv.config();

//Connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user : process.env. DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME

});

//CHECK IF THERE IS CONNECTION
db.connect ((err)=>{
    //if no connection
    if(err) return console.log ('error connecting to MYSQL');

    //IF CONNNECTION WORKS SUCCESSFULLY
    Console.log ('connected to MYSQL as if:', db.threadId);

})

//<your code goes down here
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

//data.ejs file is in the views folder
app.get ('/data',(req,res)=>{
    //retrieve information using get
    db.query('SELECT*FROM patients',(err, results)=>{
        if(err){
            console.error(err);
            res.status(500). send('error retrieving data')
        }else {
            //display the record to the browser
            res.render('data',{results:results});
        }
    });
});

//2. Retrieving all providers
app.get ('/data',(req,res)=>{
    //retrieve information using get
    db.query('SELECT first_Name, last_Name, Provider_specialty FROM providers',(err, results)=>{
        if(err){
            console.error(err);
            res.status(500). send('error retrieving data')
        }else {
            //display the record to the browser
            res.render('data',{results:results});
        }
    });
});

//3. filter patients by first name
app.get ('/data',(req,res)=>{
    //retrieve information using get
    db.query('SELECT first_name FROM patients',(err, results)=>{
        if(err){
            console.error(err);
            res.status(500). send('error retrieving data')
        }else {
            //display the record to the browser
            res.render('data',{results:results});
        }
    });
});

// retrive providers with there specialty
app.get ('/data',(req,res)=>{
    //retrieve information using get
    db.query('SELECT provider_specialty FROM patients',(err, results)=>{
        if(err){
            console.error(err);
            res.status(500). send('error retrieving data')
        }else {
            //display the record to the browser
            res.render('data',{results:results});
        }
    });
});
//my code goes up there

//start the server
app.listen(process.env.PORT,()=>{
    console.log(`server lsitening on port ${process.env.PORT}`);

    //Sending a message to the browser
     console.log('sending message to the browser...');
     app.get('/', (req,res)=>{
        res.send('server started successfully')
     });
});


