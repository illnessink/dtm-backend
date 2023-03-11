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

const admin = require("firebase-admin");

const { getAuth } = require('firebase-admin/auth');



// config settings
require('dotenv').config();
const {DATABASE_URL, GOOGLE_PRIVATE_KEY_ID, GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_ID } = process.env


admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "down-to-match",
      "private_key_id": GOOGLE_PRIVATE_KEY_ID,
      "private_key": GOOGLE_PRIVATE_KEY.replace(/\n/g, ''),
      "client_email": "firebase-adminsdk-hdtbl@down-to-match.iam.gserviceaccount.com",
      "client_id": GOOGLE_CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hdtbl%40down-to-match.iam.gserviceaccount.com"
    })
  });

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

// authorization/authentication middleware
app.use(async function(req, res, next){
    //capture token
    const token = req.get('Authorization');
    if(token){
        const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
        req.user = user;
    } else {
        req.user= null;
    }
    next();
});

function isAuthenticated(req, res, next) {
    if(!req.user) {
        return res.status(401).send('You must log in to access your profile.');
    }
    next();
    }

// router
app.get('/', isAuthenticated, (req, res) => {
    res.send("DOWN TO MATCH");
});

app.use(matchesRouter);
app.use(usersRouter);

// listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express is listening on port: ${PORT}`));