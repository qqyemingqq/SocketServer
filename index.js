var button = document.querySelector(".button");

var socket = io('http://localhost//socket.io.js');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

button.addEventListener("pointerup",()=>{
  console.log("button pressed");
  socket.send('欢迎！');
})
socket.on('message',(data)=>{
  console.log(data);
})