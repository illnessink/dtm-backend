// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const matchesRouter = require('./controllers/matches');
const usersRouter = require('./controllers/users');
// const Profile = require('./models/Profile')

// initialize app
const app = express();

// config settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

// database connection
mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL);

// database connection error/message
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + 'is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));

// mount middleware
app.use(morgan("dev"));
app.use(express.json()); 
app.use(cors());

// router
app.get('/', (req, res) => {
    res.send("DOWN TO MATCH");
});

app.use(matchesRouter);
app.use(usersRouter);

// listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express is listening on port: ${PORT}`));