import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


io.on('connection',(socket)=>{
    console.log("a User connected", socket.id);   
    // socket.on() is used to listen to events. can be used both on client and server side  
     socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);

    })
})

export {app, io, server}
