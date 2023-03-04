const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbconnect = require("./utils/db");
const userrouter = require("./routes/userroutes");
const msgroutes = require("./routes/msgroutes");
const socket = require("socket.io");

const path=require("path");

// const corsOptions = {
//   optionsSuccessStatus: 200, // For legacy browser support
//   credentials: true, // This is important.
//   origin: "https://satishsahu25.github.io",
// };


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://satishsahu25.github.io');
  next();
});

app.use(cors());
app.use(express.json());


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

