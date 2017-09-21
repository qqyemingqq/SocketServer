var button = document.querySelector(".button");

var socket = io.connect('http://localhost:8085/');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

button.addEventListener("pointerup",()=>{
  console.log("button pressed");
  socket.send('in');
})
socket.on('message',(data)=>{
  console.log(data);
})