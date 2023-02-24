const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

const handleRoomSubmit = function (event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("room", { payload: input.value });
  input.value = "";
};
form.addEventListener("submit", handleRoomSubmit);
