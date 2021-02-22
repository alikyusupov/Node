
//take care of routing to the file on the sever side
const path = require('path');
//most popular Node.js routing framework
const express = require('express');
//take care of dealing with posted data
const bodyParser = require('body-parser');
//in charge of remembering user session throughout the requests
const session = require('express-session');
//connect DB to session
const mongoDBStore = require("connect-mongodb-session")(session)
//make easy to work with mongoDB
const mongoose = require("mongoose");
//User model
const User = require("./models/User");
//Order model
const Contact = require("./models/Contacts")
//initializing our app
const app = express();
//initializing DB
const store = new mongoDBStore({
	uri: process.env.MONGO_DB_URI ||"mongodb+srv://Alisher:asd123asd@dressify-zvh54.mongodb.net/itmo",
    databaseName:"itmo",
	collection:"sessions"
});


//const bcrypt = require("bcryptjs");

const cors = require("cors")

const port = process.env.PORT||3000;

const server = require('http').createServer(app);

app.use(cors())

const userRoutes  = require("./routes/user")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ 
      secret: 'da896624-28b1-44cd-8048-e8d6bc276b17',
      cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
      },
      resave: false, 
      saveUninitialized: false, 
      store:store 
    })
);

app.use("/", userRoutes)

mongoose.connect("mongodb+srv://Alisher:asd123asd@dressify-zvh54.mongodb.net/itmo?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=>{
	server.listen(port,()=>{
		console.log(`Listening on ${port}`);
	});
})
.catch(err=>{
	console.log(err)
})