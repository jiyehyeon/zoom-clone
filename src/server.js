import http from "http";
import SocketIO from "socket.io";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
  socket.on(
    "room",
    (msg, done) => {
      console.log(msg);
      setTimeout(() => {
        done();
      });
    },
    10000
  );
});

// wss.on("connection", (socket) => {
//   console.log("Connected to Browser ✅");
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   socket.on("close", () => {
//     console.log("Disconnected from the browser ❌");
//   });

//   socket.on("message", (res) => {
//     const message = JSON.parse(res.toString("utf-8"));
//     console.log(message);
//     switch (message.type) {
//       case "new_message":
//         console.log("new message");
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break;
//       case "nickname":
//         console.log("try to change nickname");
//         socket["nickname"] = message.payload;
//         break;
//     }
//   });
// });

const handleListen = () => console.log("Listening");
server.listen(3000, handleListen);
