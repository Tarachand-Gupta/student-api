const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const socket = require("socket.io");
const conversation_dictionary_personalModel = require("./model/Conversation.model");
const personal_conversationModel = require("./model/ConversationDict.model");
const cors = require('cors');
//Importing  Routes
const authRouter = require('./routes/auth');
const userActionRouter = require('./routes/userAction');
const messageActionRouter = require('./routes/messageAction');
const studentService = require('./routes/studentService');
const collegeAction = require('./routes/CollegeAction');
const teacherAction = require('./routes/teacherAction');
const globalService = require('./routes/globalService');

//Importing Functions

const Functions = require("./functions/functions")

require("dotenv").config();
//app Config
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

const port = process.env.PORT || 4000;

//check
app.use(express.json());

//========== SOCKET ====== START =================
io.on("connection", (socket) => {

  socket.on("user-update socketID in userDB", (data) => {

    Functions.saveSocketToUser(data, socket.id)

  })

  console.log("New socket connection !", socket.id);

  socket.emit("user - get my socket id", socket.id);

  //===========Send | Recive=============
  socket.on("send message -to server", (body) => {
    console.log("body=>", body);
    let toSocket = ""
    Functions.saveMessage(body)
      .then((res) => {
        if (res) {
          Functions.getSocketIdByUserId(body.toParticipentId).then((res) => {
            io.to(res).emit('recive message -from server', body);
            console.log("res ", res);
          }

          )
        }
      })
  });
});

//========Socket =======END==========

const uri =
  process.env.ATLAS_URI ||
  "mongodb+srv://tara:tara2784@cluster0-ctwtw.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});




app.use('/auth', authRouter);
app.use('/userAction', userActionRouter);
app.use('/messageAction', messageActionRouter);
app.use('/studentService', studentService);
app.use('/collegeAction', collegeAction);
app.use('/teacherAction', teacherAction);
app.use('/globalService', globalService);

//app.use(require('express').static(require('path').join('public')));


server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
// module.exports.handler = serverless(app);
