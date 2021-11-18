const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const socket = require("socket.io");
const conversation_dictionary_personalModel = require("./model/Conversation.model");
const personal_conversationModel = require("./model/ConversationDict.model");
const errorHandler = require("./middleware/error");
const cors = require("cors");
//Importing  Routes
const authRouter = require("./routes/auth");
const userActionRouter = require("./routes/userAction");
const messageActionRouter = require("./routes/messageAction");
const studentService = require("./routes/studentService");
const collegeAction = require("./routes/CollegeAction");
const teacherAction = require("./routes/teacherAction");
const globalService = require("./routes/globalService");

//Importing Functions

const Functions = require("./functions/functions");
const JWT = require("./functions/JwtToken");

require("dotenv").config();
//app Config
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 4000;

//check
app.use(express.json());

//========== SOCKET ====== START =================
io.on("connection", (socket) => {
  socket.on("user-update socketID in userDB", (data) => {
    Functions.saveSocketToUser(data, socket.id);
  });

  console.log("New socket connection !", socket.id);

  socket.emit("user - get my socket id", socket.id);

  //===========Send | Recive=============
  socket.on("send message -to server", (body) => {
    console.log("body=>", body);
    let toSocket = "";
    Functions.saveMessage(body).then((res) => {
      if (res) {
        Functions.getSocketIdByUserId(body.toParticipentId).then((res) => {
          io.to(res).emit("recive message -from server", body);
          console.log("res ", res);
        });
      }
    });
  });
});

//========Socket =======END==========

const uri =
  process.env.ATLAS_URI ||
  "mongodb+srv://";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/auth", authRouter);
app.use("/userAction", userActionRouter);
app.use("/messageAction", messageActionRouter);
app.use("/studentService", studentService);
app.use("/collegeAction", collegeAction);
app.use("/teacherAction", teacherAction);
app.use("/globalService", globalService);
app.use("/newAuth", require("./routes/newAuth"));
app.use("/private", require("./routes/private"));
// const TEST = async () => {
//   payload = {
//     _id: { $oid: "5e3536e1b29cf92840171f3e" }

//   };
//   const token = await JWT.createToken(payload);
//   console.log("token : ", token);
// };
// TEST();

//app.use(require('express').static(require('path').join('public')));

app.use(errorHandler); //last piece off middleware

const mainServer = server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error ${err}`);
  mainServer.close(() => process.exit(1));
});

module.exports = app;
// module.exports.handler = serverless(app);
