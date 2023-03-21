// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const matchesRouter = require('./controllers/matches');
const quizRouter = require('./controllers/quizzes');
const chatRouter = require('./controllers/chats');
const http = require('http');
const fileUpload = require('express-fileupload');

// const Profile = require('./models/Profile')

// initialize app
const app = express();

// io server
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://downtomatch.netlify.app"],
        credentials: true, 
        methods: ["GET", "POST"],
        }
});

const admin = require("firebase-admin");

const { getAuth } = require('firebase-admin/auth');



// config settings
require('dotenv').config();
const { DATABASE_URL, GOOGLE_PRIVATE_KEY_ID, GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_ID } = process.env


admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "down-to-match",
      "private_key_id": GOOGLE_PRIVATE_KEY_ID,
      "private_key": GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
app.use(fileUpload({ createParentPath: true}));

// io connection
global.onlineUsers = new Map();
io.on('connection', (socket) => {
    console.log('a user connected:' + socket.id);
    global.chatSocket = socket;
    socket.on("addUser", (id) => {
        onlineUsers.set(id, socket.id);

      });
    
      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
          socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
      });

    // socket.on("disconnect", () => {
    //     console.log("user disconnected:" + socket.id)
    // })
  });

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

app.use("/matches", isAuthenticated, matchesRouter);
app.use("/profiles", isAuthenticated, usersRouter);
app.use("/quizzes", isAuthenticated, quizRouter);
app.use("/msg", isAuthenticated, chatRouter);

// listener
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Express is listening on port: ${PORT}`));
