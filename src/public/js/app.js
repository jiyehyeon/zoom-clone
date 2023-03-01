const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const msg = room.querySelector("form");
const chatBox = room.querySelector("#chat");

room.hidden = true;

let roomName;

function showRoom(msg) {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  msg.addEventListener("submit", handleMessageSubmit);
}

const handleRoomSubmit = function (e) {
  e.preventDefault();
  const input = form.querySelector("input");
  roomName = input.value;

  socket.emit("enter_room", input.value, showRoom);

  input.value = "";
};

const alert = function (message) {
  const div = document.createElement("div");
  div.innerText = message;
  chatBox.appendChild(div);
};

const handleMessageSubmit = function (e) {
  e.preventDefault();
  const input = msg.querySelector("input");
  console.log(input.value);

  try {
    socket.emit("message", roomName, input.value);
    addMessage("send", input.value);
  } catch (err) {
    console.log(err);
  }

  input.value = "";
};

const addMessage = function (type, text) {
  const msgBox = document.createElement("li");
  msgBox.innerText = text;

  switch (type) {
    case "receive":
      msgBox.style.textAlign = "start";
      break;
    case "send":
      msgBox.style.textAlign = "end";
      break;
  }

  chatBox.appendChild(msgBox);
};

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  alert("새로운 사람이 대화방에 참가했습니다.");
});

socket.on("message", (text) => {
  console.log(text);
  addMessage("receive", text);
});

socket.on("leave", () => {
  alert("누군가 방을 나갔습니다.");
});
