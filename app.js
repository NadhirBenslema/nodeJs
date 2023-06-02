const express=require('express');
const http=require('http');
const mongo=require('mongoose');
const bodyParser=require('body-parser');
const {add} = require('./controller/chatController')
const user=require('./model/user')


const mongoconnection=require('./config/mongoconnection.json')

var path = require("path");

mongo.connect(mongoconnection.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DataBase Connected");
      })
      .catch((err) => {
        console.log(err);
    });




var app=express();
app.set("views",path.join(__dirname,"views"));
app.set("view engine","twig");

const userRouter=require('./routes/user');
// const { Socket } = require('socket.io');

const server=http.createServer(app);
const io = require("socket.io")(server);
//Handle socket.io events
io.on("connection",(Socket)=>{
  console.log("User connected");      //socket :envoie one to one
  Socket.emit("msg","A new user is connected");//io : braodcast 

  Socket.on("x",(data)=>{
    Socket.broadcast.emit("x",data);
  });
  Socket.on("msg",(data)=>{
    console.log("d1 "+data);
    add(data);
    io.emit("msg",data);
  });
  Socket.on("disconnect",()=>{
    
    io.emit("msg","A user is disconnected");
  });
});
//socket.io events

server.listen(3000,()=>console.log("Server is running..."));

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
////////////////////////
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
////////////////////////


app.use('/user',userRouter);
app.delete('/del/:id' , async (req, res) => {
  try{
    await user.findByIdAndRemove(req.params.id);
    // Emit the Socket.IO event
    io.emit('userDeleted', { userId: req.params.id });
    res.status(200).send("deleted successfully");

}catch(err){
    res.status(500).send(err.message)
}
});