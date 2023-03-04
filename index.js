const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbconnect = require("./utils/db");
const userrouter = require("./routes/userroutes");
const msgroutes = require("./routes/msgroutes");
const socket = require("socket.io");

const path=require("path");


app.use(express.json());
app.use(cors());

//apis
app.use("/api/auth", userrouter);
app.use("/api/msg", msgroutes);

const server = app.listen(process.env.PORT, () => {
  dbconnect();
  console.log(`Server is running on port ${process.env.PORT}`);
});

//static
app.use(express.static(path.join(__dirname, "./frontend/build")));

//adding html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));

})





///////socket

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineusers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("adduser", (userid) => {
    onlineusers.set(userid, socket.id);
  });

  socket.on("sendmsg", (data) => {
    const sendusersocket = onlineusers.get(data.to);
    if (sendusersocket) {
      console.log(data);
      socket.to(sendusersocket).emit("msgreceive", data.message);
    }
  });
});

