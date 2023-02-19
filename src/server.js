import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log("Listening");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const handleConnection = function (socket) {
  console.log(socket);
};

wss.on("connection", handleConnection); // 이벤트 수신

server.listen(3000, handleListen);
